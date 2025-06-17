import React from "react";
import { useNavigate } from "react-router-dom";
import LawyerList from "./LawyerListLocal";

const lawyerCategories = [
  {
    title: "Supreme Court Lawyers",
    description:
      "Navigate Pakistan’s judiciary with experts who handle cases with utmost professionalism.",
    image:
      "https://i.pinimg.com/736x/e8/4f/e6/e84fe6bc3c5bfe7907103d91a4877049.jpg",
    route: "/supreme-court-lawyers",
  },
  {
    title: "High Court Lawyers",
    description:
      "Get top-tier representation in any provincial high court by seasoned legal authorities.",
    image:
      "https://i.pinimg.com/736x/5f/cc/29/5fcc2927fb3c48be7ee1c1e8911d6a31.jpg",
    route: "/high-court-lawyers",
  },
  {
    title: "Civil Lawyers",
    description:
      "Handle disputes related to property, contracts, and family matters with expert guidance.",
    image:
      "https://i.pinimg.com/474x/f7/92/32/f79232d39f72812422927b13926053e2.jpg",
    route: "/civil-lawyers",
  },
  {
    title: "Criminal Litigation",
    description:
      "Defend your rights with experienced lawyers specializing in criminal cases.",
    image:
      "https://i.pinimg.com/474x/83/5b/3c/835b3ca33bacaee8e49c0e190d253151.jpg",
    route: "/criminal-litigation",
  },
  {
    title: "Family Matters",
    description:
      "Get legal assistance for family disputes, child custody, and divorce cases.",
    image:
      "https://i.pinimg.com/474x/74/d1/27/74d12745d776fdd870625dc455154446.jpg",
    route: "/family-matters",
  },
];

const Lawyers = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-white min-h-screen">
      <h2 className="text-4xl font-extrabold text-amber-400 text-center mb-8">
        Find the Perfect Lawyer
      </h2>
      <LawyerList/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyerCategories.map((lawyer, index) => (
          <div
            key={index}
            className="bg-gray-950 border border-amber-500 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={lawyer.image}
              alt={lawyer.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-amber-400">
                {lawyer.title}
              </h3>
              <p className="mt-2 text-gray-300">{lawyer.description}</p>
              <button
                className="mt-4 w-full bg-amber-500 text-gray-900 py-2 rounded-lg font-semibold hover:bg-amber-600 transition"
                onClick={() => navigate(lawyer.route)}
              >
                Get Started →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lawyers;
