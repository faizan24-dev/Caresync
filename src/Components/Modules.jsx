export default function Modules() {
  const modules = [
    {
      title: 'Patient',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      items: ['Registration', 'Doctor Search', 'Booking Appointment', 'Online Payments', 'Appointment History'],
    },
    {
      title: 'Doctor',
      icon: 'M5 13l4 4L19 7',
      items: ['Profile Management', 'Schedule Management', 'Appointment Management', 'Earnings Dashboard'],
    },
    {
      title: 'Admin',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      items: ['Doctor Approval', 'Users Management', 'Appointment Monitoring', 'Reports & Analytics'],
    },
  ];

  return (
    <section id="modules" className="py-20 bg-pure-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="label-caps text-forest-grove">Platform</span>
          <h2 className="text-3xl font-semibold text-ink-black tracking-[-0.02em] mt-3">Core Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {modules.map((mod, idx) => (
            <div key={idx} className="bg-mist-gray rounded-[24px] p-6 relative flex flex-col justify-between border border-ink-black/5">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[12px] bg-pure-white text-forest-grove flex items-center justify-center border border-ink-black/5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mod.icon}/></svg>
                  </div>
                  <h3 className="text-xl font-semibold text-ink-black">{mod.title}</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-graphite mb-6">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-forest-grove rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#" className="text-forest-grove font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Learn More →
              </a>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
