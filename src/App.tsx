import { useEffect, useRef, useState } from "react";

type Tab = "bio" | "cv";

type EntryProps = {
  date: string;
  children: React.ReactNode;
};

function Entry({ date, children }: EntryProps) {
  return (
    <div className="cv-entry">
      <div className="cv-date">{date}</div>
      <div className="cv-detail">{children}</div>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}<span className="external-mark" aria-hidden="true">↗</span>
    </a>
  );
}

function Bio() {
  return (
    <div id="bio-panel" role="tabpanel" aria-labelledby="bio-tab" className="panel bio-panel">
      <div className="intro-grid">
        <aside className="portrait-column">
          <img
            className="portrait-photo"
            src="/portrait.png"
            alt="Portrait of Jingjie Li"
            width="2099"
            height="2099"
          />
          <div className="profile-links" aria-label="Contact links">
            <a href="mailto:jingjie.li.21@ucl.ac.uk">Email</a>
            <ExternalLink href="https://github.com/jingjie-li">GitHub</ExternalLink>
            <ExternalLink href="https://gitlab.com/lijingjie1">GitLab</ExternalLink>
          </div>
        </aside>

        <div className="bio-copy">
          <h1>Jingjie Li</h1>
          <p className="role">Research Fellow at the Sainsbury Wellcome Centre, UCL</p>

          <div className="bio-text">
            <p>
              I am a systems neuroscience Research Fellow in the {" "}
              <ExternalLink href="https://erlichlab.org/">Erlich Lab</ExternalLink> at the
              Sainsbury Wellcome Centre, University College London, where I recently completed
              my PhD earlier this year.
            </p>
            <p>
              During my PhD, I studied how the brain flexibly selects, maintains, and transforms
              information to guide decisions and actions. My work combines carefully designed
              behavioural tasks for rats with Neuropixels recordings, optogenetics, and quantitative
              modelling. I presented this research as a talk at the main {" "}
              <ExternalLink href="https://youtu.be/c5Vf0L5InSM?t=2276">COSYNE 2026 meeting</ExternalLink>,
              and a related manuscript is available as a {" "}
              <ExternalLink href="https://doi.org/10.1101/2025.11.28.691186">preprint</ExternalLink>.
            </p>
            <p>
              I am actively seeking a postdoctoral position for my next step. I am particularly
              interested in motor control, short-term memory, and decision-making, and I want to
              understand embodied cognition: how we use the body as a resource for cognition when
              solving tasks, and the neural mechanisms that make this possible. Please {" "}
              <a href="mailto:jingjie.li.21@ucl.ac.uk">reach out</a> if you would like to have a conversation.
            </p>
            <p>
              Outside the lab, I enjoy road cycling—exploring new routes and scenery, and climbing
              mountains under my own power. You can follow my rides on {" "}
              <ExternalLink href="https://www.strava.com/athletes/145556491">Strava</ExternalLink>.
            </p>
          </div>

          <div className="research-tags" aria-label="Research interests">
            <span>Short-term memory</span>
            <span>Decision-making</span>
            <span>Motor control</span>
            <span>Embodied cognition</span>
            <span>Neural population dynamics</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CV() {
  return (
    <div id="cv-panel" role="tabpanel" aria-labelledby="cv-tab" className="panel cv-panel">
      <div className="cv-heading">
        <div>
          <p className="eyebrow">Curriculum vitae</p>
          <h1>Experience &amp; work</h1>
        </div>
        <div className="cv-contact">
          <a href="mailto:jingjie.li.21@ucl.ac.uk">jingjie.li.21@ucl.ac.uk</a>
          <span>London, United Kingdom</span>
        </div>
      </div>

      <div className="cv-section">
        <h2>Education</h2>
        <Entry date="2021—2026">
          <h3>PhD in Systems Neuroscience</h3>
          <p><strong>University College London</strong> · Sainsbury Wellcome Centre</p>
          <p>
            Advisor: Dr {" "}
            <ExternalLink href="https://www.sainsburywellcome.org/people/jeffrey-erlich">
              Jeffrey C. Erlich
            </ExternalLink>
          </p>
          <p className="muted">Thesis: Context-Dependent Neural Mechanisms of Memory-Guided Decisions</p>
          <p><strong>2025 Jon Driver Prize</strong> · Outstanding PhD student in neuroscience, UCL</p>
        </Entry>
        <Entry date="2019—2021">
          <h3>PhD study in Neural Science</h3>
          <p><strong>New York University</strong> · New York / Shanghai</p>
          <p className="muted">Transferred to UCL in the second year of the programme.</p>
        </Entry>
        <Entry date="2015—2019">
          <h3>BSc in Biomedical Engineering</h3>
          <p><strong>Xi’an Jiaotong University</strong> · China</p>
          <p className="muted">Thesis: Design and implementation of a portable EEG monitoring system, from amplifier hardware to software.</p>
        </Entry>
      </div>

      <div className="cv-section publications">
        <h2>Publications &amp; preprints</h2>
        <Entry date="2026">
          <p>Michael Lohse, Oliver M. Gauld, Maja T. Skrętowska, Ainiah Masood, Chaofei Bao, <strong>Jingjie Li</strong>, et al.</p>
          <h3><ExternalLink href="https://doi.org/10.7554/eLife.111872.1">Zapit: Open Source Random-Access Photostimulation For Neuroscience</ExternalLink></h3>
          <p className="muted"><em>eLife</em></p>
        </Entry>
        <Entry date="2025">
          <p><strong>Jingjie Li</strong>, Ariel Ziqian Xu, Chaofei Bao, Albert Albesa-González, Liujunli Li, Claudia Clopath, Jeffrey C. Erlich</p>
          <h3><ExternalLink href="https://doi.org/10.1101/2025.11.28.691186">Flexible selection of working memory representations to reduce cognitive cost</ExternalLink></h3>
          <p className="muted"><em>Nature Communications</em> · in revision</p>
        </Entry>
        <Entry date="2025">
          <p>Oliver M. Gauld*, Chaofei Bao*, <strong>Jingjie Li</strong>, Gauthier Boeshertz, Timothy P. H. Sit, et al.</p>
          <h3><ExternalLink href="https://doi.org/10.64898/2025.12.11.693624">A frontal motor circuit for economic decisions and actions</ExternalLink></h3>
          <p className="muted"><em>Nature Neuroscience</em> · in revision</p>
        </Entry>
        <Entry date="2024">
          <p>Liujunli Li, Timo Flesch, Ce Ma, <strong>Jingjie Li</strong>, Yizhou Chen, Hung-Tu Chen, Jeffrey C. Erlich</p>
          <h3><ExternalLink href="https://doi.org/10.1523/JNEUROSCI.0018-24.2024">Encoding of 2D self-centered plans and world-centered positions in the rat frontal orienting field</ExternalLink></h3>
          <p className="muted"><em>Journal of Neuroscience</em></p>
        </Entry>
        <Entry date="2023">
          <p>Chaofei Bao*, Xiaoyue Zhu*, Joshua Möller-Mara, <strong>Jingjie Li</strong>, Sylvain Dubroqua, Jeffrey C. Erlich</p>
          <h3><ExternalLink href="https://doi.org/10.1038/s41593-023-01461-x">The rat frontal orienting field dynamically encodes value for economic decisions under risk</ExternalLink></h3>
          <p className="muted"><em>Nature Neuroscience</em></p>
        </Entry>
      </div>

      <div className="cv-section">
        <h2>Selected presentations</h2>
        <Entry date="Mar 2026">
          <h3>Context-dependent localisation of short-term memory</h3>
          <p>Selected talk, COSYNE · Lisbon</p>
          <p className="muted">Top 2% of submissions · <ExternalLink href="https://youtu.be/c5Vf0L5InSM?t=2276">Watch recording</ExternalLink></p>
        </Entry>
        <Entry date="Jun 2025">
          <h3>Task context shapes short-term memory localisation</h3>
          <p>Selected talk, UCL Neuroscience Symposium</p>
        </Entry>
        <Entry date="Oct 2024">
          <h3>Task context shapes short-term memory localisation</h3>
          <p>Poster, Society for Neuroscience annual meeting · Chicago</p>
        </Entry>
        <Entry date="Mar 2024">
          <h3>Distinct cortical mechanisms for egocentric vs. allocentric planning</h3>
          <p>Poster, COSYNE · Lisbon</p>
        </Entry>
      </div>

      <div className="cv-section">
        <h2>Open-source projects</h2>
        <Entry date="2022">
          <h3><ExternalLink href="https://gitlab.com/sainsbury-wellcome-centre/delab/bpod-auto">High-throughput rodent behavioural system</ExternalLink></h3>
          <p>Hardware and software infrastructure based on Bpod, supporting daily training, electrophysiology, and optogenetics experiments.</p>
        </Entry>
        <Entry date="2022">
          <h3><ExternalLink href="https://gitlab.com/sainsbury-wellcome-centre/delab/devops/scale-app">Body-weight management system</ExternalLink></h3>
          <p>RFID-based animal tracking and automated weight-data management for water-restricted animals.</p>
        </Entry>
        <Entry date="2018">
          <h3><ExternalLink href="https://github.com/jingjie-li/ECGMonitor">Portable ECG / oximeter monitor</ExternalLink></h3>
          <p>Low-power hardware design with Bluetooth data streaming.</p>
        </Entry>
        <Entry date="2018">
          <h3><ExternalLink href="https://github.com/erlichlab/BpodSoundModule">Low-latency sound module</ExternalLink></h3>
          <p>Under 10 ms playback latency using a TI Hi-Fi DAC and Raspberry Pi I²S control.</p>
        </Entry>
      </div>

      <div className="cv-section split-section">
        <div>
          <h2>Awards &amp; fellowships</h2>
          <Entry date="2025"><p><strong>Jon Driver Prize</strong><br />Outstanding PhD student in neuroscience, UCL</p></Entry>
          <Entry date="2021—2025"><p>Studentship, Sainsbury Wellcome Centre, UCL</p></Entry>
          <Entry date="2019—2021"><p>Doctoral scholarship, NYU Shanghai</p></Entry>
          <Entry date="2018"><p>First Prize, National Biomedical Engineering Competition, China</p></Entry>
          <Entry date="2016—2018"><p>Siyuan Scholarship and Outstanding Student, Xi’an Jiaotong University</p></Entry>
        </div>
        <div>
          <h2>Skills</h2>
          <dl className="skills-list">
            <dt>Programming</dt><dd>Python, MATLAB, C, C++, SQL, R, Git, LaTeX, Verilog HDL, assembly</dd>
            <dt>Hardware</dt><dd>PCB layout, embedded-system integration</dd>
            <dt>Experimental</dt><dd>Stereotaxic surgery, behavioural training, extracellular recording, optogenetics, chemogenetics</dd>
            <dt>Languages</dt><dd>English, Chinese (native)</dd>
          </dl>
        </div>
      </div>

      <div className="cv-section">
        <h2>Community &amp; supervision</h2>
        <Entry date="2022—2024">
          <h3>Allen Institute ecephys spike sorting</h3>
          <p>Bug fixes and refinements for accurate waveform and quality metrics.</p>
        </Entry>
        <Entry date="2024">
          <h3>BrainGlobe</h3>
          <p>Created a tutorial for silicon-probe tracking with computational neuroanatomy tools.</p>
        </Entry>
        <Entry date="2022—2025">
          <h3>Student supervision</h3>
          <p>
            Supervised Ziqian Ariel Xu through undergraduate and master’s research at UCL.
            Ziqian is currently enrolled in the {" "}
            <ExternalLink href="https://www.fchampalimaud.org/indp-students-2025">
              International Neuroscience Doctoral Programme (INDP) at the Champalimaud Foundation
            </ExternalLink>.
          </p>
        </Entry>
      </div>
    </div>
  );
}

function App() {
  const initialTab: Tab = window.location.hash === "#cv" ? "cv" : "bio";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const bioRef = useRef<HTMLButtonElement>(null);
  const cvRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onHashChange = () => setActiveTab(window.location.hash === "#cv" ? "cv" : "bio");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", tab === "cv" ? "#cv" : window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveTabFocus = (event: React.KeyboardEvent, current: Tab) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = current === "bio" ? "cv" : "bio";
    selectTab(next);
    (next === "bio" ? bioRef : cvRef).current?.focus();
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#bio" onClick={(event) => { event.preventDefault(); selectTab("bio"); }} aria-label="Jingjie Li, home">
          <span>Jingjie</span> Li
        </a>
        <div className="tabs" role="tablist" aria-label="Profile sections">
          <button ref={bioRef} id="bio-tab" role="tab" aria-selected={activeTab === "bio"} aria-controls="bio-panel" tabIndex={activeTab === "bio" ? 0 : -1} onClick={() => selectTab("bio")} onKeyDown={(event) => moveTabFocus(event, "bio")}>Bio</button>
          <button ref={cvRef} id="cv-tab" role="tab" aria-selected={activeTab === "cv"} aria-controls="cv-panel" tabIndex={activeTab === "cv" ? 0 : -1} onClick={() => selectTab("cv")} onKeyDown={(event) => moveTabFocus(event, "cv")}>CV</button>
        </div>
      </header>

      <main>{activeTab === "bio" ? <Bio /> : <CV />}</main>

      <footer>
        <span>© {new Date().getFullYear()} Jingjie Li</span>
      </footer>
    </div>
  );
}

export default App;
