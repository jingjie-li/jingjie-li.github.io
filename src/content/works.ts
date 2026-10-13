export const works = [
  {
    id: "working-memory",
    category: "PhD work",
    ongoing: false,
    title: "Task structure flexibly shifts working memory formats across cortical circuits",
    image: "/works/delayed-response-task.png",
    alt: "Delayed response task with egocentric cue-to-action and allocentric cue-to-location variations",
    description: "My main PhD project investigates how task structure shapes the selection and maintenance of working memory representations across cortical circuits. Combined large-scale Neuropixels recordings, optogenetics, and neural modelling with rats performing a paralleled version of the delayed response task, I found multiple level converging evidence that the rat brain can flexible choose the format of short term memory depend on the cognitive cost of the task.",
    links: [
      { label: "Preprint", href: "https://www.biorxiv.org/content/10.1101/2025.11.28.691186v1" },
      { label: "COSYNE talk", href: "https://youtu.be/c5Vf0L5InSM?t=2276" },
    ],
  },
  {
    id: "premotor-posture-choice",
    category: "PhD work",
    ongoing: true,
    title: "Disentangling the relationship of premotor activity, posture and choice (Ongoing)",
    image: "/works/premotor-posture-choice.png",
    alt: "Example head-direction trajectories and choice decoding from video posture and M2 activity",
    description: "My secondary PhD project explores the relationship between premotor activity, body posture, and upcoming choices during a delayed response task. By analysing neural recordings alongside video-based posture, I aim to disentangle their contributions to memory-guided decisions.",
    links: [],
  },
  {
    id: "longitudinal-3d-posture",
    category: "New direction",
    ongoing: true,
    title: "Longitudinal recording of 3D posture during the learning of the delayed response task (Ongoing)",
    image: "/works/3d-posture-learning.gif",
    alt: "Animated multi-camera video and reconstructed 3D rat posture during the delayed response task",
    description: "Building on these two projects, I am driving a new, technically challenging effort to track animals’ 3D posture throughout learning. Using high-resolution, multi-camera video and 3D pose reconstruction, we aim to understand how animals develop embodied planning strategies as they learn the delayed response task.",
    links: [],
  },
];

export const worksChinese: Record<string, { title: string; alt: string; description: string }> = {
  "working-memory": {
    title: "任务结构灵活改变皮层回路中的工作记忆表征形式",
    alt: "延迟反应任务：自我中心的线索到动作映射与世界中心的线索到位置映射",
    description: "我的博士主要课题研究任务结构如何影响不同皮层回路中工作记忆表征的选择与维持。通过结合大规模 Neuropixels 电生理记录、光遗传学和神经建模，并让大鼠执行平行版本的延迟反应任务，我发现了多个层面相互印证的证据，表明大鼠大脑能够根据任务的认知成本，灵活选择短时记忆的表征形式。",
  },
  "premotor-posture-choice": {
    title: "解析运动前区活动、身体姿态与选择之间的关系（进行中）",
    alt: "头部朝向轨迹示例，以及基于视频姿态和 M2 活动的选择解码",
    description: "我的博士第二课题探索延迟反应任务中运动前区活动、身体姿态与即将作出的选择之间的关系。通过联合分析神经记录与视频提取的姿态，我希望厘清它们在记忆引导决策中的作用。",
  },
  "longitudinal-3d-posture": {
    title: "延迟反应任务学习过程中的三维姿态纵向记录（进行中）",
    alt: "延迟反应任务中的多相机视频与大鼠三维姿态重建动画",
    description: "在上述两个项目的基础上，我正推动一个技术上具有挑战性的新项目，持续追踪动物学习过程中的三维姿态。借助高分辨率多相机视频与三维姿态重建，我们希望理解动物在学习延迟反应任务时如何形成具身规划策略。",
  },
};
