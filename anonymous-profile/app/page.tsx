"use client";

import { useEffect, useMemo, useState } from "react";

const PRESETS = [1, 3, 5, 10];
const DEFAULT_MINUTES = 5;

const capabilities = [
  {
    number: "01",
    title: "복잡함을 구조로",
    copy: "흩어진 요구와 맥락을 빠르게 정리해, 누구나 다음 행동을 이해할 수 있는 흐름으로 바꿉니다.",
    tags: ["Research", "Service Flow", "Prioritization"],
  },
  {
    number: "02",
    title: "반복을 시스템으로",
    copy: "사람이 매번 기억해야 하는 일을 줄이고, 팀이 본질적인 판단에 집중할 수 있도록 자동화합니다.",
    tags: ["AI Workflow", "Automation", "Operations"],
  },
  {
    number: "03",
    title: "결과를 이야기로",
    copy: "복잡한 데이터와 의사결정을 설득력 있는 문장과 시각 언어로 연결해 공유 가능한 결과물로 만듭니다.",
    tags: ["Narrative", "Prototyping", "Visual Design"],
  },
];

const experiences = [
  {
    period: "NOW",
    role: "Independent Product Systems Builder",
    company: "익명 스튜디오 · Remote",
    description:
      "작은 팀의 업무 흐름을 진단하고, AI와 노코드 도구를 엮어 더 가볍고 명확한 운영 시스템을 설계합니다.",
  },
  {
    period: "23—25",
    role: "Operations Design Lead",
    company: "Series-B SaaS · APAC",
    description:
      "빠르게 성장하는 조직의 온보딩과 협업 체계를 재설계해 인수인계 시간을 줄이고 실행 속도를 높였습니다.",
  },
  {
    period: "20—23",
    role: "Content & Learning Strategist",
    company: "Education Tech · Seoul",
    description:
      "사용자 리서치와 콘텐츠 전략을 연결해 복잡한 학습 경험을 일관된 서비스 여정으로 만들었습니다.",
  },
];

const projects = [
  {
    index: "01",
    label: "SERVICE SYSTEM",
    title: "복잡한 온보딩을\n7분의 흐름으로",
    description:
      "역할마다 달랐던 안내를 하나의 인터랙티브 체크리스트로 묶어, 첫날부터 스스로 움직일 수 있게 했습니다.",
    result: "진입 문의 −41%",
    accent: "lime",
  },
  {
    index: "02",
    label: "AI AUTOMATION",
    title: "주간 리포트를\n15분의 루틴으로",
    description:
      "여러 채널의 진행 상황을 수집·요약·분류하는 워크플로를 설계해 회의 전 준비 시간을 크게 줄였습니다.",
    result: "준비 시간 −68%",
    accent: "violet",
  },
  {
    index: "03",
    label: "KNOWLEDGE DESIGN",
    title: "배움이 쌓이는\n팀의 기억 장치",
    description:
      "회의와 실험에서 나온 인사이트가 사라지지 않도록 기록 규칙과 검색 가능한 지식 구조를 만들었습니다.",
    result: "재사용률 2.4×",
    accent: "coral",
  },
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Home() {
  const [duration, setDuration] = useState(DEFAULT_MINUTES * 60);
  const [remaining, setRemaining] = useState(DEFAULT_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerMessage, setTimerMessage] = useState("준비됨");

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setIsRunning(false);
          setTimerMessage("집중 완료");
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const progress = useMemo(
    () => (duration === 0 ? 0 : ((duration - remaining) / duration) * 360),
    [duration, remaining],
  );

  const selectPreset = (minutes: number) => {
    const seconds = minutes * 60;
    setDuration(seconds);
    setRemaining(seconds);
    setIsRunning(false);
    setTimerMessage(`${minutes}분 설정`);
  };

  const startTimer = () => {
    if (remaining === 0) setRemaining(duration);
    setIsRunning(true);
    setTimerMessage("집중 중");
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setTimerMessage("잠시 멈춤");
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemaining(duration);
    setTimerMessage("처음으로");
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="익명 프로필 처음으로">
          <span className="brand-mark">A/</span>
          <span>
            ANON PROFILE
            <small>SIMULATION 07</small>
          </span>
        </a>
        <nav aria-label="주요 섹션">
          <a href="#about">소개</a>
          <a href="#experience">경험</a>
          <a href="#work">프로젝트</a>
        </nav>
        <a className="header-status" href="#work">
          <span />
          협업 가능
        </a>
      </header>

      <section className="hero" id="top" aria-labelledby="profile-title">
        <div className="hero-profile">
          <div className="eyebrow-row">
            <p className="eyebrow">ANONYMOUS PRODUCT BUILDER</p>
            <span className="privacy-badge">IDENTITY SHIELDED</span>
          </div>

          <div className="identity-lockup">
            <div className="avatar" aria-hidden="true">
              <span>NØ</span>
              <i />
            </div>
            <div>
              <p className="alias-label">PROJECT ALIAS</p>
              <h1 id="profile-title">NO. 07</h1>
            </div>
          </div>

          <p className="hero-statement">
            복잡한 일을
            <br />
            <em>조용한 흐름</em>으로 바꿉니다.
          </p>

          <div className="profile-meta">
            <p>
              Product Systems <span>/</span> Operations <span>/</span> AI Workflow
            </p>
            <p>UTC+9 · REMOTE FIRST</p>
          </div>

          <div className="hero-actions">
            <a className="primary-button" href="#work">
              작업 방식 보기 <span aria-hidden="true">↘</span>
            </a>
            <a className="text-link" href="#about">
              90초 프로필 읽기 <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <aside className="timer-card" aria-labelledby="timer-title">
          <div className="timer-heading">
            <div>
              <p className="eyebrow">FOCUS COMPANION</p>
              <h2 id="timer-title">집중 타이머</h2>
            </div>
            <span className={`timer-state ${isRunning ? "active" : ""}`}>
              {timerMessage}
            </span>
          </div>

          <p className="timer-intro">
            잠깐의 집중으로 이 익명 프로필을 천천히 둘러보세요.
          </p>

          <div
            className="timer-dial"
            style={{ "--progress": `${progress}deg` } as React.CSSProperties}
          >
            <div className="timer-dial-inner">
              <time aria-live="polite" dateTime={`PT${remaining}S`}>
                {formatTime(remaining)}
              </time>
              <span>{isRunning ? "DEEP FOCUS" : "SELECT & START"}</span>
            </div>
          </div>

          <div className="preset-row" aria-label="타이머 시간 선택">
            {PRESETS.map((minutes) => (
              <button
                key={minutes}
                className={duration === minutes * 60 ? "selected" : ""}
                type="button"
                onClick={() => selectPreset(minutes)}
                aria-pressed={duration === minutes * 60}
              >
                {minutes}분
              </button>
            ))}
          </div>

          <div className="timer-controls">
            <button
              className="start-button"
              type="button"
              onClick={startTimer}
              disabled={isRunning}
            >
              시작
            </button>
            <button type="button" onClick={pauseTimer} disabled={!isRunning}>
              정지
            </button>
            <button type="button" onClick={resetTimer}>
              리셋
            </button>
          </div>
        </aside>
      </section>

      <section className="signal-strip" aria-label="프로필 핵심 지표">
        <p>BUILT FOR CLARITY</p>
        <div>
          <strong>06</strong>
          <span>YEARS OF PRACTICE</span>
        </div>
        <div>
          <strong>18</strong>
          <span>SYSTEMS SHIPPED</span>
        </div>
        <div>
          <strong>32%</strong>
          <span>LESS HANDOFF FRICTION</span>
        </div>
        <p>PRIVACY BY DESIGN</p>
      </section>

      <section className="section about-section" id="about">
        <div className="section-index">
          <span>01</span>
          <p>ABOUT THE ALIAS</p>
        </div>
        <div className="about-copy">
          <p className="large-copy">
            좋은 시스템은 사람을 더 바쁘게 만들지 않습니다.
            <br />
            <span>덜 헤매고, 더 잘 판단하게 만듭니다.</span>
          </p>
          <div className="about-detail">
            <p>
              저는 리서치, 운영, 콘텐츠와 기술 사이의 빈틈을 발견하고
              연결합니다. 화면 하나를 만드는 것보다 그 화면이 팀의 일하는
              방식을 어떻게 바꾸는지에 더 관심이 있습니다.
            </p>
            <p>
              이 페이지는 특정 인물을 식별하지 않는 가상 프로필입니다.
              이름·회사·연락처 대신 문제를 바라보는 태도와 일의 결과만
              남겼습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="capability-grid" aria-label="핵심 역량">
        {capabilities.map((capability) => (
          <article className="capability-card" key={capability.number}>
            <div className="card-number">{capability.number}</div>
            <h3>{capability.title}</h3>
            <p>{capability.copy}</p>
            <ul aria-label={`${capability.title} 관련 기술`}>
              {capability.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-index light">
          <span>02</span>
          <p>SELECTED EXPERIENCE</p>
        </div>
        <div className="experience-content">
          <div className="experience-intro">
            <h2>
              직함보다
              <br />
              <em>남긴 변화</em>
            </h2>
            <p>
              세부 정보는 가렸지만, 맡았던 문제와 만든 변화의 방향은
              숨기지 않았습니다.
            </p>
          </div>
          <div className="timeline">
            {experiences.map((experience) => (
              <article className="timeline-item" key={experience.period}>
                <time>{experience.period}</time>
                <div>
                  <h3>{experience.role}</h3>
                  <p className="company">{experience.company}</p>
                  <p className="description">{experience.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-index">
          <span>03</span>
          <p>SELECTED WORK</p>
        </div>
        <div className="work-heading">
          <h2>문제를 줄이고, 흐름을 남긴 작업들.</h2>
          <p>
            프로젝트명과 고객 정보는 익명 처리했습니다.
            <br />
            결과 수치는 시뮬레이션용 예시입니다.
          </p>
        </div>

        <div className="projects">
          {projects.map((project) => (
            <article
              className={`project-card project-${project.accent}`}
              key={project.index}
            >
              <div className="project-top">
                <span>{project.label}</span>
                <span>{project.index} / 03</span>
              </div>
              <h3>
                {project.title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p>{project.description}</p>
              <div className="project-result">
                <span>SIMULATED OUTCOME</span>
                <strong>{project.result}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <p className="eyebrow">THE END / OR A START</p>
        <h2>
          이름보다 먼저,
          <br />
          <em>일하는 방식</em>을 기억해 주세요.
        </h2>
        <a href="#top">
          프로필 처음으로 <span aria-hidden="true">↑</span>
        </a>
      </section>

      <footer>
        <p>ANON PROFILE · SIMULATION 07</p>
        <p>모든 인물·경력·성과는 과제용 가상 데이터입니다.</p>
        <p>© 2026 — BUILT WITH INTENT</p>
      </footer>
    </main>
  );
}
