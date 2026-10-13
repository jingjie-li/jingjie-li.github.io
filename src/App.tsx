import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import bioEnglishSource from "./content/bio.en.md?raw";
import bioChineseSource from "./content/bio.zh.md?raw";
import cvSource from "./content/cv.md?raw";
import { works, worksChinese } from "./content/works";

type Tab = "bio" | "works" | "cv";
type Language = "en" | "zh";
type Metadata = Record<string, string>;
type BioContent = { metadata: Metadata; paragraphs: string[]; cards: { title: string; paragraphs: string[] }[]; news: { date: string; text: string }[] };
type CvEntry = { date: string; title?: string; paragraphs: string[] };
type CvSectionData = { title: string; entries: CvEntry[] };
type CvContent = { metadata: Metadata; title: string; sections: CvSectionData[] };

function parseMarkdownFile(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { metadata: {}, body: source.trim() };
  const metadata = Object.fromEntries(match[1].split("\n").map((line) => {
    const separator = line.indexOf(":");
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
  }));
  return { metadata, body: match[2].trim() };
}

function parseBio(source: string): BioContent {
  const { metadata, body } = parseMarkdownFile(source);
  const blocks = body.split(/\n(?=## )/);
  const paragraphs = blocks[0].split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const cards: BioContent["cards"] = [];
  const news: BioContent["news"] = [];
  for (const block of blocks.slice(1)) {
    const [heading, ...lines] = block.split("\n");
    const text = lines.join("\n").trim();
    if (heading === "## News") {
      for (const entry of text.split(/\n(?=### )/).filter(Boolean)) {
        const [date, ...description] = entry.split("\n");
        news.push({ date: date.replace(/^### /, ""), text: description.join("\n").trim() });
      }
    } else {
      cards.push({ title: heading.replace(/^## /, ""), paragraphs: text.split(/\n\s*\n/).filter(Boolean) });
    }
  }
  return { metadata, paragraphs, cards, news };
}

function parseCv(source: string): CvContent {
  const { metadata, body } = parseMarkdownFile(source);
  const title = body.match(/^# (.+)$/m)?.[1] ?? "";
  const sectionBlocks = body.split(/\n(?=## )/).filter((block) => block.startsWith("## "));
  const sections = sectionBlocks.map((block) => {
    const [heading, ...sectionLines] = block.split("\n");
    const entryBlocks = sectionLines.join("\n").trim().split(/\n(?=### )/).filter(Boolean);
    const entries = entryBlocks.map((entryBlock) => {
      const [dateLine, ...entryLines] = entryBlock.split("\n");
      const titleLine = entryLines.find((line) => line.startsWith("#### "));
      const paragraphs = entryLines
        .filter((line) => line !== titleLine)
        .join("\n")
        .trim()
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
      return { date: dateLine.replace(/^### /, ""), title: titleLine?.replace(/^#### /, ""), paragraphs };
    });
    return { title: heading.replace(/^## /, ""), entries };
  });
  return { metadata, title, sections };
}

const bioContent: Record<Language, BioContent> = {
  en: parseBio(bioEnglishSource),
  zh: parseBio(bioChineseSource),
};
const cvContent = parseCv(cvSource);

function renderInline(markdown: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokenPattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|(?<!\\)\*[^*\n]+(?<!\\)\*| {2}\n)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenPattern.exec(markdown))) {
    if (match.index > cursor) nodes.push(markdown.slice(cursor, match.index).replace(/\\\*/g, "*"));
    const token = match[0];
    if (token === "  \n") {
      nodes.push(<br key={key++} />);
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)!;
      const external = /^https?:\/\//.test(link[2]);
      nodes.push(<a key={key++} href={link[2]} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{link[1]}{external && <span className="external-mark" aria-hidden="true">↗</span>}</a>);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    cursor = tokenPattern.lastIndex;
  }
  if (cursor < markdown.length) nodes.push(markdown.slice(cursor).replace(/\\\*/g, "*"));
  return nodes;
}

function ProfileIcon({ name }: { name: "email" | "github" | "gitlab" | "scholar" | "zhihu" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "email" && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>}
      {name === "github" && <><path d="M9 19c-4.5 1.4-4.5-2.5-6.3-3M15 22v-3.5c0-1 .1-1.8-.5-2.5 3.4-.4 7-1.6 7-7.4 0-1.6-.5-2.9-1.5-4 .2-.8.6-2.6-.2-4.1 0 0-1.3-.4-4.3 1.6a15 15 0 0 0-7 0C5.5.1 4.2.5 4.2.5c-.8 1.5-.4 3.3-.2 4.1-1 1.1-1.5 2.4-1.5 4 0 5.8 3.6 7 7 7.4-.5.5-.5 1.4-.5 2.5V22" transform="translate(2 2) scale(.83)" /></>}
      {name === "gitlab" && <><path d="m12 21 9-7-3-11-3 7H9L6 3 3 14l9 7Z" /><path d="m3 14 6-4 3 11 3-11 6 4M9 10l-3 4 6 7 6-7-3-4" /></>}
      {name === "scholar" && <><path d="m2 8 10-5 10 5-10 5-10-5Z" /><path d="M6 10v6c3 3 9 3 12 0v-6M22 8v8" /></>}
      {name === "zhihu" && <text x="12" y="17.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="18" fontWeight="500">知</text>}
    </svg>
  );
}

function Bio({ language }: { language: Language }) {
  const content = bioContent[language];
  const meta = content.metadata;
  return (
    <div id="bio-panel" role="tabpanel" aria-labelledby="bio-tab" className="panel bio-panel">
      <div className="intro-grid">
        <aside className="portrait-column">
          <img className="portrait-photo" src={meta.portrait} alt={meta.portraitAlt} width="2099" height="2099" />
          <div className="profile-links" aria-label={meta.contactLabel}>
            <a href={`mailto:${meta.email}`} aria-label={meta.emailLabel} title={meta.emailLabel}><ProfileIcon name="email" /></a>
            <a href={meta.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><ProfileIcon name="github" /></a>
            <a href={meta.gitlab} target="_blank" rel="noreferrer" aria-label="GitLab" title="GitLab"><ProfileIcon name="gitlab" /></a>
            <a href={meta.scholar} target="_blank" rel="noreferrer" aria-label="Google Scholar" title="Google Scholar"><ProfileIcon name="scholar" /></a>
            <a href={meta.zhihu} target="_blank" rel="noreferrer" aria-label={language === "zh" ? "知乎" : "Zhihu"} title={language === "zh" ? "知乎" : "Zhihu"}><ProfileIcon name="zhihu" /></a>
          </div>
        </aside>
        <div className="bio-copy">
          <h1>{meta.name}</h1>
          <p className="role">{meta.role}</p>
          <div className="bio-text">{content.paragraphs.map((paragraph) => <p key={paragraph}>{renderInline(paragraph)}</p>)}</div>
          <div className="research-tags" aria-label={meta.interestsLabel}>
            {meta.interests.split("|").map((interest) => <span key={interest}>{interest.trim()}</span>)}
          </div>
        </div>
      </div>
      <div className="research-grid">
        {content.cards.map((card) => (
          <section className="research-card" key={card.title}>
            <h2>{card.title}</h2>
            {card.paragraphs.map((paragraph) => <p key={paragraph}>{renderInline(paragraph)}</p>)}
          </section>
        ))}
      </div>
      <section className="news-section" aria-labelledby="news-heading">
        <h2 id="news-heading">{meta.newsLabel}</h2>
        <ol className="news-list">
          {content.news.map((entry) => (
            <li key={entry.date}>
              <span className="news-date">{entry.date}</span>
              <p>{renderInline(entry.text)}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function CvEntryView({ entry }: { entry: CvEntry }) {
  return (
    <div className="cv-entry">
      <div className="cv-date">{entry.date}</div>
      <div className="cv-detail">
        {entry.title && <h3>{renderInline(entry.title)}</h3>}
        {entry.paragraphs.map((paragraph) => <p className={paragraph.startsWith("*") ? "muted" : undefined} key={paragraph}>{renderInline(paragraph)}</p>)}
      </div>
    </div>
  );
}

function CvSection({ section }: { section: CvSectionData }) {
  return (
    <section className={`cv-section ${section.title.startsWith("Publications") ? "publications" : ""}`}>
      <h2>{section.title}</h2>
      <div className="cv-items">{section.entries.map((entry, index) => <CvEntryView entry={entry} key={`${entry.date}-${index}`} />)}</div>
    </section>
  );
}

function CV() {
  const awards = cvContent.sections.find((section) => section.title === "Awards & fellowships");
  const skills = cvContent.sections.find((section) => section.title === "Skills");
  return (
    <div id="cv-panel" role="tabpanel" aria-labelledby="cv-tab" className="panel cv-panel">
      <div className="cv-heading">
        <div><p className="eyebrow">{cvContent.metadata.eyebrow}</p><h1>{cvContent.title}</h1></div>
        <div className="cv-contact"><a href={`mailto:${cvContent.metadata.email}`}>{cvContent.metadata.email}</a><span>{cvContent.metadata.location}</span></div>
      </div>
      {cvContent.sections.map((section) => {
        if (section === skills) return null;
        if (section === awards && skills) return (
          <section className="cv-section split-section" key="awards-skills">
            <div><h2>{awards.title}</h2><div className="cv-items">{awards.entries.map((entry, index) => <CvEntryView entry={entry} key={`${entry.date}-${index}`} />)}</div></div>
            <div><h2>{skills.title}</h2><dl className="skills-list">{skills.entries.map((entry) => <Fragment key={entry.date}><dt>{entry.date}</dt><dd>{renderInline(entry.paragraphs.join(" "))}</dd></Fragment>)}</dl></div>
          </section>
        );
        return <CvSection section={section} key={section.title} />;
      })}
    </div>
  );
}

function Works({ language }: { language: Language }) {
  const isChinese = language === "zh";
  const filterLabels: Record<string, string> = isChinese ? { All: "全部", "PhD work": "博士研究", Ongoing: "进行中" } : { All: "All", "PhD work": "PhD work", Ongoing: "Ongoing" };
  const [filter, setFilter] = useState("All");
  const visibleWorks = works.filter((work) => filter === "All" || (filter === "Ongoing" ? work.ongoing : work.category === "PhD work")).map((work) => isChinese ? { ...work, ...worksChinese[work.id] } : work);
  return (
    <div id="works-panel" role="tabpanel" aria-labelledby="works-tab" className="panel works-panel">
      <div className="works-heading">
        <div><p className="eyebrow">{isChinese ? "研究项目" : "Research projects"}</p><h1>{isChinese ? "我的研究" : "My works"}</h1></div>
        <div className="work-filters" role="group" aria-label={isChinese ? "筛选研究项目" : "Filter research projects"}>
          {["All", "PhD work", "Ongoing"].map((label) => <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>{filterLabels[label]}</button>)}
        </div>
      </div>
      <div className="works-list">
        {visibleWorks.map((work) => (
          <article className="work-entry" key={work.id}>
            <a className="work-image-link" href={work.image} target="_blank" rel="noreferrer" aria-label={`${isChinese ? "查看图片" : "View figure"}: ${work.title}`}>
              <img src={work.image} alt={work.alt} className="work-image" loading="lazy" />
            </a>
            <div className="work-copy">
              <p className="work-category">{isChinese ? (work.category === "PhD work" ? "博士研究" : "新方向") : work.category}</p>
              <h2>{work.title}</h2>
              <p>{work.description}</p>
              {work.links.length > 0 && <div className="work-links">{work.links.map((link) => <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{isChinese ? (link.label === "Preprint" ? "预印本" : "COSYNE 报告") : link.label}<span className="external-mark" aria-hidden="true">↗</span></a>)}</div>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function tabFromHash(): Tab {
  return window.location.hash === "#cv" ? "cv" : window.location.hash === "#works" ? "works" : "bio";
}

function getInitialLanguage(): Language {
  const saved = window.localStorage.getItem("language");
  if (saved === "en" || saved === "zh") return saved;
  return "en";
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(tabFromHash);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const bioRef = useRef<HTMLButtonElement>(null);
  const cvRef = useRef<HTMLButtonElement>(null);
  const worksRef = useRef<HTMLButtonElement>(null);
  const meta = bioContent[language].metadata;
  const isChinese = language === "zh";
  const pageIsChinese = isChinese && activeTab !== "cv";

  useEffect(() => {
    const onHashChange = () => setActiveTab(tabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const pageMeta = pageIsChinese ? bioContent.zh.metadata : bioContent.en.metadata;
    document.documentElement.lang = pageIsChinese ? "zh-CN" : "en";
    document.title = pageMeta.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", pageMeta.description);
    window.localStorage.setItem("language", language);
  }, [language, pageIsChinese]);

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", tab === "bio" ? window.location.pathname : `#${tab}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveTabFocus = (event: React.KeyboardEvent, current: Tab) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const order: Tab[] = ["bio", "works", "cv"];
    const next = order[(order.indexOf(current) + (event.key === "ArrowRight" ? 1 : 2)) % order.length];
    selectTab(next);
    ({ bio: bioRef, works: worksRef, cv: cvRef })[next].current?.focus();
  };

  return (
    <div className={`site-shell ${isChinese ? "is-zh" : ""}`}>
      <header className="site-header">
        <div className="header-primary">
          <a className="wordmark" href="#bio" onClick={(event) => { event.preventDefault(); selectTab("bio"); }} aria-label={meta.homeLabel}><span>{meta.name}</span></a>
          <div className="tabs" role="tablist" aria-label={isChinese ? "个人资料栏目" : "Profile sections"}>
            <button ref={bioRef} id="bio-tab" role="tab" aria-selected={activeTab === "bio"} aria-controls="bio-panel" tabIndex={activeTab === "bio" ? 0 : -1} onClick={() => selectTab("bio")} onKeyDown={(event) => moveTabFocus(event, "bio")}>{meta.bioTab}</button>
            <button ref={worksRef} id="works-tab" role="tab" aria-selected={activeTab === "works"} aria-controls="works-panel" tabIndex={activeTab === "works" ? 0 : -1} onClick={() => selectTab("works")} onKeyDown={(event) => moveTabFocus(event, "works")}>{isChinese ? "我的研究" : "My works"}</button>
            <button ref={cvRef} id="cv-tab" role="tab" aria-selected={activeTab === "cv"} aria-controls="cv-panel" tabIndex={activeTab === "cv" ? 0 : -1} onClick={() => selectTab("cv")} onKeyDown={(event) => moveTabFocus(event, "cv")}>CV</button>
          </div>
        </div>
        <div className="language-switch" role="group" aria-label={meta.languageLabel}>
          <button type="button" className={!isChinese ? "active" : ""} aria-pressed={!isChinese} onClick={() => setLanguage("en")}>EN</button><span aria-hidden="true">/</span><button type="button" className={isChinese ? "active" : ""} aria-pressed={isChinese} onClick={() => setLanguage("zh")}>中</button>
        </div>
      </header>
      <main>{activeTab === "bio" ? <Bio language={language} /> : activeTab === "works" ? <Works language={language} /> : <CV />}</main>
      <footer><span>© {new Date().getFullYear()} {meta.name}</span></footer>
    </div>
  );
}

export default App;
