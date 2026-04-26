import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/21820c95-417d-44df-b287-ba5315d2e9c2/files/54a7f121-f42b-4535-bbb5-c26598eaa355.jpg";
const STUDENTS_IMG = "https://cdn.poehali.dev/projects/21820c95-417d-44df-b287-ba5315d2e9c2/files/069472d7-c674-43e7-be69-f5c9cc521c06.jpg";
const LECTURE_IMG = "https://cdn.poehali.dev/projects/21820c95-417d-44df-b287-ba5315d2e9c2/files/fe3605e0-7b87-48ff-af98-44ce5e675060.jpg";

const navLinks = [
  { id: "about", label: "О университете" },
  { id: "programs", label: "Программы" },
  { id: "teachers", label: "Преподаватели" },
  { id: "admission", label: "Приём" },
  { id: "life", label: "Студентам" },
  { id: "news", label: "Новости" },
  { id: "schedule", label: "Расписание" },
  { id: "contacts", label: "Контакты" },
];

const stats = [
  { value: "12 000+", label: "Студентов" },
  { value: "800+", label: "Преподавателей" },
  { value: "120+", label: "Программ" },
  { value: "30+", label: "Лет опыта" },
];

const programs = [
  { icon: "Code", title: "Информационные технологии", desc: "Программирование, ИИ, кибербезопасность", badge: "Топ выбор", color: "var(--uni-blue)" },
  { icon: "TrendingUp", title: "Экономика и менеджмент", desc: "Бизнес, финансы, маркетинг, MBA", badge: "", color: "#7c3aed" },
  { icon: "Microscope", title: "Науки о жизни", desc: "Биотехнологии, медицина, фармацевтика", badge: "Новая", color: "var(--uni-green)" },
  { icon: "Palette", title: "Дизайн и медиа", desc: "Графика, UX/UI, медиапроизводство", badge: "", color: "var(--uni-gold)" },
  { icon: "Scale", title: "Юриспруденция", desc: "Международное право, корпоративное право", badge: "", color: "var(--uni-red)" },
  { icon: "Globe", title: "Международные отношения", desc: "Дипломатия, политология, глобалистика", badge: "", color: "#0891b2" },
];

const teachers = [
  { name: "Александр Новиков", role: "Доктор технических наук", dept: "ИТ и кибербезопасность", exp: "25 лет" },
  { name: "Марина Соколова", role: "Профессор, MBA", dept: "Менеджмент и маркетинг", exp: "18 лет" },
  { name: "Дмитрий Волков", role: "Академик РАН", dept: "Биотехнологии", exp: "32 года" },
  { name: "Елена Карпова", role: "Кандидат наук", dept: "Дизайн и медиа", exp: "14 лет" },
];

const newsItems = [
  { date: "22 апреля 2026", tag: "Наука", title: "СФУ вошёл в топ-10 лучших университетов России по версии Forbes", img: STUDENTS_IMG },
  { date: "18 апреля 2026", tag: "События", title: "Открытый день: 5 мая приглашаем будущих студентов на экскурсию", img: LECTURE_IMG },
  { date: "10 апреля 2026", tag: "Спорт", title: "Команда по робототехнике завоевала золото на чемпионате РФ", img: HERO_IMG },
];

const lifeBlocks = [
  { icon: "Music", title: "Культура и творчество", desc: "Студенческий театр, хор, КВН и фестивали" },
  { icon: "Trophy", title: "Спорт", desc: "25 секций, бассейн, тренажёрный зал, стадион" },
  { icon: "Users", title: "Клубы и организации", desc: "Более 60 студенческих объединений" },
  { icon: "Home", title: "Общежитие", desc: "Современные кампусы с Wi-Fi и охраной" },
  { icon: "Plane", title: "Обмен за рубежом", desc: "Программы в 40 странах мира" },
  { icon: "Briefcase", title: "Карьерный центр", desc: "Стажировки и трудоустройство от партнёров" },
];

const scheduleClasses = [
  { time: "08:00–09:30", subject: "Математический анализ", teacher: "Волков Д.В.", room: "А-201", group: "ИТ-21" },
  { time: "09:45–11:15", subject: "Алгоритмы и структуры данных", teacher: "Новиков А.С.", room: "Б-104", group: "ИТ-21" },
  { time: "11:30–13:00", subject: "Базы данных", teacher: "Карпова Е.Н.", room: "В-305", group: "ИТ-22" },
  { time: "13:45–15:15", subject: "Веб-разработка", teacher: "Новиков А.С.", room: "А-110", group: "ИТ-22" },
  { time: "15:30–17:00", subject: "Маркетинг и бренд", teacher: "Соколова М.И.", room: "Г-201", group: "МЕН-21" },
  { time: "17:15–18:45", subject: "Финансовый менеджмент", teacher: "Соколова М.И.", room: "Г-202", group: "МЕН-22" },
];

const scheduleExams = [
  { date: "12 мая", subject: "Математический анализ", teacher: "Волков Д.В.", room: "А-201", group: "ИТ-21", time: "09:00" },
  { date: "14 мая", subject: "Программирование", teacher: "Новиков А.С.", room: "Б-101", group: "ИТ-21", time: "11:00" },
  { date: "16 мая", subject: "Экономическая теория", teacher: "Соколова М.И.", room: "Г-301", group: "МЕН-21", time: "09:00" },
  { date: "19 мая", subject: "Базы данных", teacher: "Карпова Е.Н.", room: "В-305", group: "ИТ-22", time: "13:00" },
  { date: "21 мая", subject: "Маркетинг", teacher: "Соколова М.И.", room: "Г-201", group: "МЕН-22", time: "11:00" },
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт"];

export default function Index() {
  const [activeNav, setActiveNav] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scheduleTab, setScheduleTab] = useState<"classes" | "exams">("classes");
  const [selectedDay, setSelectedDay] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navLinks.map((l) => document.getElementById(l.id));
      const current = sections.findIndex((s) => {
        if (!s) return false;
        const rect = s.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current >= 0) setActiveNav(navLinks[current].id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "#f0f4f8", color: "var(--uni-text)" }}>

      {/* ─── NAVBAR ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(8,13,22,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--uni-border)" : "none",
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-oswald font-bold text-sm"
              style={{ background: "linear-gradient(135deg, var(--uni-cyan), var(--uni-purple))", color: "#fff" }}
            >
              A
            </div>
            <span className="font-oswald font-bold text-xl tracking-wide" style={{ color: "var(--uni-cyan)" }}>
              УНИВЕРСИТЕТ APEX
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="nav-link text-sm font-medium transition-all"
                style={{ color: activeNav === l.id ? "var(--uni-cyan)" : "rgba(232,240,254,0.7)" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("admission")}
            className="hidden lg:block btn-primary px-5 py-2 rounded-lg text-sm"
          >
            <span>Подать заявку</span>
          </button>

          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--uni-cyan)" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden glass border-t" style={{ borderColor: "var(--uni-border)" }}>
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-left py-2 text-sm font-medium nav-link w-fit"
                  style={{ color: "rgba(232,240,254,0.8)" }}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("admission")}
                className="btn-primary px-5 py-2 rounded-lg text-sm mt-2 w-full"
              >
                <span>Подать заявку</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: "4rem" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            filter: "brightness(0.25) saturate(0.8)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,245,0.12) 0%, rgba(139,92,246,0.10) 50%, rgba(245,158,11,0.06) 100%)",
          }}
        />

        <div
          className="absolute animate-float"
          style={{
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,245,0.12) 0%, transparent 70%)",
            top: "10%", right: "10%",
          }}
        />
        <div
          className="absolute animate-float"
          style={{
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            bottom: "15%", left: "5%",
            animationDelay: "3s",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6 animate-fade-in-up"
              style={{
                background: "rgba(0,212,245,0.1)",
                border: "1px solid rgba(0,212,245,0.3)",
                color: "var(--uni-cyan)",
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: "var(--uni-cyan)" }} />
              Приём 2026 открыт
            </div>

            <h1
              className="font-oswald font-bold mb-6 animate-fade-in-up delay-100"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              <span className="text-gradient">Знания,</span>{" "}
              <br />
              <span style={{ color: "#e8f0fe" }}>которые</span>
              <br />
              <span className="text-gradient-orange">меняют мир</span>
            </h1>

            <p
              className="text-lg mb-10 max-w-2xl animate-fade-in-up delay-200"
              style={{ color: "rgba(232,240,254,0.65)", lineHeight: 1.7 }}
            >
              Университет APEX — место, где передовая наука встречается с практикой. 120+ программ, 800 экспертов-преподавателей, партнёрства с лидерами индустрии.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo("programs")}
                className="btn-primary px-8 py-4 rounded-xl text-base"
              >
                <span>Выбрать программу</span>
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="btn-outline px-8 py-4 rounded-xl text-base"
              >
                О университете
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 animate-fade-in-up delay-400">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-oswald font-bold text-3xl glow-text" style={{ color: "var(--uni-cyan)" }}>
                    {s.value}
                  </div>
                  <div className="text-sm mt-1" style={{ color: "rgba(232,240,254,0.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ color: "var(--uni-cyan)", opacity: 0.6 }}
        >
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 mesh-bg">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-oswald tracking-widest mb-4 uppercase" style={{ color: "var(--uni-cyan)" }}>
                О нас
              </div>
              <h2 className="section-title text-5xl mb-6" style={{ color: "#e8f0fe" }}>
                30 лет создаём<br />
                <span className="text-gradient">лидеров отрасли</span>
              </h2>
              <p className="mb-6" style={{ color: "rgba(232,240,254,0.65)", lineHeight: 1.8 }}>
                APEX — один из ведущих частных университетов России, аккредитованный в соответствии с международными стандартами. Мы объединяем фундаментальные науки с прикладными исследованиями и реальной практикой.
              </p>
              <p className="mb-8" style={{ color: "rgba(232,240,254,0.65)", lineHeight: 1.8 }}>
                Наши выпускники работают в Google, Сбере, McKinsey, Газпроме и сотнях других компаний-лидеров. 94% трудоустраиваются в течение 6 месяцев после окончания.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Award", text: "Государственная аккредитация" },
                  { icon: "Globe", text: "40 стран-партнёров" },
                  { icon: "Star", text: "Рейтинг ТОП-10 Forbes" },
                  { icon: "BookOpen", text: "120+ образовательных программ" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 p-3 rounded-xl glass"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,212,245,0.15)" }}
                    >
                      <Icon name={item.icon } size={16} style={{ color: "var(--uni-cyan)" }} />
                    </div>
                    <span className="text-sm" style={{ color: "rgba(232,240,254,0.8)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={STUDENTS_IMG}
                alt="Студенты"
                className="rounded-2xl w-full object-cover"
                style={{ height: 480, border: "1px solid var(--uni-border)" }}
              />
              <div
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-5"
                style={{ border: "1px solid rgba(0,212,245,0.3)" }}
              >
                <div className="font-oswald text-3xl font-bold" style={{ color: "var(--uni-cyan)" }}>94%</div>
                <div className="text-sm mt-1" style={{ color: "rgba(232,240,254,0.6)" }}>трудоустройство<br />выпускников</div>
              </div>
              <div
                className="absolute -top-6 -right-6 glass rounded-2xl p-5"
                style={{ border: "1px solid rgba(139,92,246,0.3)" }}
              >
                <div className="font-oswald text-3xl font-bold" style={{ color: "var(--uni-purple)" }}>№7</div>
                <div className="text-sm mt-1" style={{ color: "rgba(232,240,254,0.6)" }}>в рейтинге<br />Forbes 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section id="programs" className="py-24" style={{ background: "var(--uni-dark)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-oswald tracking-widest mb-4 uppercase" style={{ color: "var(--uni-cyan)" }}>
              Образование
            </div>
            <h2 className="section-title text-5xl mb-4" style={{ color: "#e8f0fe" }}>
              Программы обучения
            </h2>
            <p style={{ color: "rgba(232,240,254,0.5)" }}>
              Бакалавриат, магистратура, аспирантура и профессиональная переподготовка
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div
                key={p.title}
                className="card-hover glass rounded-2xl p-6 relative overflow-hidden cursor-pointer"
                style={{ border: "1px solid var(--uni-border)" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: p.color }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.color}20` }}
                >
                  <Icon name={p.icon} size={24} style={{ color: p.color }} />
                </div>

                {p.badge && (
                  <span
                    className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full font-oswald font-semibold"
                    style={{ background: "var(--uni-orange)", color: "#000" }}
                  >
                    {p.badge}
                  </span>
                )}

                <h3 className="font-oswald font-bold text-lg mb-2" style={{ color: "#e8f0fe" }}>
                  {p.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: "rgba(232,240,254,0.55)" }}>
                  {p.desc}
                </p>
                <button className="flex items-center gap-2 text-sm font-medium transition-all" style={{ color: p.color }}>
                  Подробнее <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEACHERS ─── */}
      <section id="teachers" className="py-24 mesh-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-oswald tracking-widest mb-4 uppercase" style={{ color: "var(--uni-purple)" }}>
              Факультет
            </div>
            <h2 className="section-title text-5xl mb-4" style={{ color: "#e8f0fe" }}>
              Наши преподаватели
            </h2>
            <p style={{ color: "rgba(232,240,254,0.5)" }}>
              Эксперты-практики с мировым именем и академическими регалиями
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {teachers.map((t, i) => (
              <div
                key={t.name}
                className="card-hover glass rounded-2xl p-6 text-center"
                style={{ border: "1px solid var(--uni-border)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-oswald font-bold"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, var(--uni-cyan), var(--uni-purple))"
                      : "linear-gradient(135deg, var(--uni-orange), #ff6b9d)",
                    color: "#fff",
                  }}
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-oswald font-semibold text-base mb-1" style={{ color: "#e8f0fe" }}>
                  {t.name}
                </h3>
                <p className="text-xs mb-2" style={{ color: "var(--uni-cyan)" }}>{t.role}</p>
                <p className="text-xs mb-3" style={{ color: "rgba(232,240,254,0.5)" }}>{t.dept}</p>
                <div
                  className="text-xs px-3 py-1 rounded-full inline-block"
                  style={{ background: "rgba(139,92,246,0.15)", color: "var(--uni-purple)" }}
                >
                  Опыт: {t.exp}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-outline px-8 py-3 rounded-xl">
              Все преподаватели
            </button>
          </div>
        </div>
      </section>

      {/* ─── ADMISSION ─── */}
      <section id="admission" className="py-24" style={{ background: "var(--uni-dark)" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-oswald tracking-widest mb-4 uppercase" style={{ color: "var(--uni-orange)" }}>
                Поступление
              </div>
              <h2 className="section-title text-5xl mb-6" style={{ color: "#e8f0fe" }}>
                Как поступить<br />
                <span className="text-gradient-orange">в APEX</span>
              </h2>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Выберите программу", desc: "Изучите 120+ направлений и выберите подходящее" },
                  { step: "02", title: "Подайте документы", desc: "Онлайн через личный кабинет или лично в приёмной комиссии" },
                  { step: "03", title: "Пройдите отбор", desc: "Вступительные испытания или ЕГЭ + портфолио" },
                  { step: "04", title: "Получите приглашение", desc: "Зачисление и оформление договора" },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 p-4 rounded-xl glass transition-all"
                    style={{ border: "1px solid var(--uni-border)" }}
                  >
                    <div
                      className="font-oswald font-bold text-2xl flex-shrink-0 w-10 text-center"
                      style={{ color: "var(--uni-orange)" }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <div className="font-oswald font-semibold mb-1" style={{ color: "#e8f0fe" }}>{item.title}</div>
                      <div className="text-sm" style={{ color: "rgba(232,240,254,0.55)" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="glass rounded-2xl p-8"
              style={{ border: "1px solid rgba(245,158,11,0.3)" }}
            >
              <h3 className="font-oswald font-bold text-2xl mb-6" style={{ color: "#e8f0fe" }}>
                Заявка на поступление
              </h3>
              <div className="space-y-4">
                {["Ваше имя", "Телефон", "Email"].map((ph) => (
                  <input
                    key={ph}
                    type="text"
                    placeholder={ph}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--uni-border)",
                      color: "#e8f0fe",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--uni-orange)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--uni-border)")}
                  />
                ))}
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{
                    background: "rgba(15,22,35,0.9)",
                    border: "1px solid var(--uni-border)",
                    color: "rgba(232,240,254,0.6)",
                  }}
                >
                  <option value="" style={{ background: "#0f1623" }}>Выберите направление</option>
                  {programs.map((p) => (
                    <option key={p.title} value={p.title} style={{ background: "#0f1623" }}>{p.title}</option>
                  ))}
                </select>
                <button
                  className="btn-primary w-full py-4 rounded-xl text-base"
                  style={{ background: "linear-gradient(135deg, var(--uni-orange), #ff6b6b)" }}
                >
                  <span>Отправить заявку</span>
                </button>
              </div>
              <p className="text-xs mt-4 text-center" style={{ color: "rgba(232,240,254,0.35)" }}>
                Приём заявок до 31 июля 2026 года
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCHEDULE ─── */}
      <section id="schedule" className="py-24 mesh-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-xs font-oswald tracking-widest mb-4 uppercase" style={{ color: "var(--uni-green)" }}>
              Расписание
            </div>
            <h2 className="section-title text-5xl mb-4" style={{ color: "#e8f0fe" }}>
              Занятия и экзамены
            </h2>
          </div>

          <div className="flex justify-center mb-8">
            <div
              className="flex rounded-xl p-1"
              style={{ background: "var(--uni-card)", border: "1px solid var(--uni-border)" }}
            >
              {(["classes", "exams"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setScheduleTab(tab)}
                  className="px-6 py-2 rounded-lg text-sm font-oswald font-medium transition-all"
                  style={{
                    background: scheduleTab === tab ? "var(--uni-green)" : "transparent",
                    color: scheduleTab === tab ? "#000" : "rgba(232,240,254,0.6)",
                  }}
                >
                  {tab === "classes" ? "Занятия" : "Экзамены"}
                </button>
              ))}
            </div>
          </div>

          {scheduleTab === "classes" && (
            <div className="flex justify-center gap-2 mb-8">
              {weekDays.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(i)}
                  className="w-12 h-12 rounded-xl text-sm font-oswald font-semibold transition-all"
                  style={{
                    background: selectedDay === i ? "var(--uni-green)" : "rgba(255,255,255,0.05)",
                    color: selectedDay === i ? "#000" : "rgba(232,240,254,0.6)",
                    border: selectedDay === i ? "none" : "1px solid var(--uni-border)",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          )}

          <div
            className="glass rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--uni-border)" }}
          >
            {scheduleTab === "classes" ? (
              <>
                <div
                  className="grid font-oswald font-semibold text-xs uppercase tracking-wider px-6 py-3"
                  style={{
                    gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr",
                    background: "rgba(16,185,129,0.1)",
                    color: "var(--uni-green)",
                  }}
                >
                  {["Время", "Дисциплина", "Преподаватель", "Аудитория", "Группа"].map((h) => (
                    <div key={h}>{h}</div>
                  ))}
                </div>
                {scheduleClasses.map((row, i) => (
                  <div
                    key={i}
                    className="schedule-row grid px-6 py-4 border-t text-sm"
                    style={{
                      gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr",
                      borderColor: "var(--uni-border)",
                    }}
                  >
                    <div className="font-oswald font-medium" style={{ color: "var(--uni-cyan)" }}>{row.time}</div>
                    <div style={{ color: "#e8f0fe" }}>{row.subject}</div>
                    <div style={{ color: "rgba(232,240,254,0.6)" }}>{row.teacher}</div>
                    <div
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit h-fit"
                      style={{ background: "rgba(0,212,245,0.1)", color: "var(--uni-cyan)" }}
                    >
                      {row.room}
                    </div>
                    <div style={{ color: "rgba(232,240,254,0.5)" }}>{row.group}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div
                  className="grid font-oswald font-semibold text-xs uppercase tracking-wider px-6 py-3"
                  style={{
                    gridTemplateColumns: "1fr 1fr 2fr 2fr 1fr 1fr",
                    background: "rgba(16,185,129,0.1)",
                    color: "var(--uni-green)",
                  }}
                >
                  {["Дата", "Время", "Дисциплина", "Преподаватель", "Аудитория", "Группа"].map((h) => (
                    <div key={h}>{h}</div>
                  ))}
                </div>
                {scheduleExams.map((row, i) => (
                  <div
                    key={i}
                    className="schedule-row grid px-6 py-4 border-t text-sm"
                    style={{
                      gridTemplateColumns: "1fr 1fr 2fr 2fr 1fr 1fr",
                      borderColor: "var(--uni-border)",
                    }}
                  >
                    <div className="font-oswald font-medium" style={{ color: "var(--uni-orange)" }}>{row.date}</div>
                    <div style={{ color: "var(--uni-green)" }}>{row.time}</div>
                    <div style={{ color: "#e8f0fe" }}>{row.subject}</div>
                    <div style={{ color: "rgba(232,240,254,0.6)" }}>{row.teacher}</div>
                    <div
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit h-fit"
                      style={{ background: "rgba(245,158,11,0.1)", color: "var(--uni-orange)" }}
                    >
                      {row.room}
                    </div>
                    <div style={{ color: "rgba(232,240,254,0.5)" }}>{row.group}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── STUDENT LIFE ─── */}
      <section id="life" className="py-24" style={{ background: "var(--uni-dark)" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="text-xs font-oswald tracking-widest mb-4 uppercase" style={{ color: "var(--uni-purple)" }}>
                Кампус
              </div>
              <h2 className="section-title text-5xl mb-6" style={{ color: "#e8f0fe" }}>
                Студенческая<br />
                <span className="text-gradient">жизнь в APEX</span>
              </h2>
              <p style={{ color: "rgba(232,240,254,0.6)", lineHeight: 1.8 }}>
                Учёба — это только часть истории. Мы создаём среду, где каждый находит своё сообщество, развивает таланты и строит сеть контактов на всю жизнь.
              </p>
            </div>
            <img
              src={LECTURE_IMG}
              alt="Студенческая жизнь"
              className="rounded-2xl w-full object-cover"
              style={{ height: 320, border: "1px solid var(--uni-border)" }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeBlocks.map((item) => (
              <div
                key={item.title}
                className="card-hover glass rounded-2xl p-6 flex gap-4"
                style={{ border: "1px solid var(--uni-border)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(139,92,246,0.15)" }}
                >
                  <Icon name={item.icon} size={22} style={{ color: "var(--uni-purple)" }} />
                </div>
                <div>
                  <h3 className="font-oswald font-semibold mb-1" style={{ color: "#e8f0fe" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "rgba(232,240,254,0.55)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="py-24 mesh-bg">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="text-xs font-oswald tracking-widest mb-4 uppercase" style={{ color: "var(--uni-cyan)" }}>
                Новости
              </div>
              <h2 className="section-title text-5xl" style={{ color: "#e8f0fe" }}>
                Последние события
              </h2>
            </div>
            <button className="btn-outline px-6 py-2 rounded-xl text-sm hidden md:block">
              Все новости
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <div
                key={item.title}
                className="card-hover glass rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: "1px solid var(--uni-border)" }}
              >
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,13,22,0.8), transparent)" }} />
                  <span
                    className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-oswald font-semibold"
                    style={{ background: "var(--uni-cyan)", color: "#000" }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-xs mb-3" style={{ color: "rgba(232,240,254,0.4)" }}>{item.date}</div>
                  <h3 className="font-oswald font-semibold text-base leading-snug" style={{ color: "#e8f0fe" }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACTS ─── */}
      <section id="contacts" className="py-24" style={{ background: "var(--uni-dark)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-oswald tracking-widest mb-4 uppercase" style={{ color: "var(--uni-orange)" }}>
              Контакты
            </div>
            <h2 className="section-title text-5xl mb-4" style={{ color: "#e8f0fe" }}>
              Свяжитесь с нами
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: "MapPin", title: "Адрес", lines: ["Москва, пр. Университетский, 15", "Корпус А, 1 этаж"], color: "var(--uni-cyan)" },
              { icon: "Phone", title: "Телефон", lines: ["+7 (495) 123-45-67", "Пн–Пт, 9:00–18:00"], color: "var(--uni-green)" },
              { icon: "Mail", title: "Email", lines: ["info@apex-uni.ru", "admission@apex-uni.ru"], color: "var(--uni-purple)" },
              { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 8:00–20:00", "Сб: 9:00–16:00"], color: "var(--uni-orange)" },
            ].map((item) => (
              <div
                key={item.title}
                className="card-hover glass rounded-2xl p-6"
                style={{ border: "1px solid var(--uni-border)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.color}20` }}
                >
                  <Icon name={item.icon} size={22} style={{ color: item.color }} />
                </div>
                <h3 className="font-oswald font-semibold mb-2" style={{ color: "#e8f0fe" }}>{item.title}</h3>
                {item.lines.map((l) => (
                  <p key={l} className="text-sm" style={{ color: "rgba(232,240,254,0.55)" }}>{l}</p>
                ))}
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,245,0.12), rgba(139,92,246,0.12))",
              border: "1px solid rgba(0,212,245,0.2)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,212,245,0.06) 0%, transparent 70%)",
              }}
            />
            <h3 className="section-title text-4xl mb-4 relative z-10" style={{ color: "#e8f0fe" }}>
              Готов к поступлению?
            </h3>
            <p className="mb-8 relative z-10" style={{ color: "rgba(232,240,254,0.6)" }}>
              Подай заявку онлайн за 5 минут — и мы перезвоним в течение рабочего дня
            </p>
            <button
              className="btn-primary px-10 py-4 rounded-xl text-base relative z-10"
              onClick={() => scrollTo("admission")}
            >
              <span>Подать заявку сейчас</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="py-10 border-t"
        style={{ background: "rgba(8,13,22,0.95)", borderColor: "var(--uni-border)" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-oswald font-bold text-sm"
                style={{ background: "linear-gradient(135deg, var(--uni-cyan), var(--uni-purple))", color: "#fff" }}
              >
                A
              </div>
              <span className="font-oswald font-bold" style={{ color: "var(--uni-cyan)" }}>
                УНИВЕРСИТЕТ APEX
              </span>
            </div>
            <p className="text-sm" style={{ color: "rgba(232,240,254,0.35)" }}>
              © 2026 Университет APEX. Все права защищены.
            </p>
            <div className="flex gap-4">
              {["Instagram", "Linkedin", "Youtube"].map((soc) => (
                <button
                  key={soc}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--uni-border)",
                    color: "rgba(232,240,254,0.5)",
                  }}
                >
                  <Icon name={soc} size={16} fallback="ExternalLink" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}