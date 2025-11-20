import React from "react";

const ShopByAgeSection = () => {
  const ageGroups = [
    {
      age: "1–3 Years",
      icon: "🧸",
      desc: "Soft toys, rattles, and first learning sets for toddlers.",
      link: "https://www.fisher-price.com/",
    },
    {
      age: "4–6 Years",
      icon: "🎨",
      desc: "Building blocks and creative play for preschoolers.",
      link: "https://www.lego.com/",
    },
    {
      age: "7–9 Years",
      icon: "🧩",
      desc: "STEM kits, puzzles, and craft games for growing kids.",
      link: "https://www.mattel.com/",
    },
    {
      age: "10+ Years",
      icon: "🤖",
      desc: "Robotics, strategy games, and tech toys for innovators.",
      link: "https://www.hasbro.com/",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-rose-50 to-pink-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#EB1551] to-[#FF5FA8]">
          🛍️ Shop by Age
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((group, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6"
            >
              <div className="text-5xl mb-3">{group.icon}</div>
              <h3 className="text-xl font-bold text-pink-600">{group.age}</h3>
              <p className="text-sm text-gray-600 mb-4">{group.desc}</p>
              <a
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm bg-gradient-to-r from-[#EB1551] to-[#FF5FA8] border-none text-white"
              >
                Visit Site
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByAgeSection;
