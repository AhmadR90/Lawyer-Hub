import React from "react";

const CaseRecords = () => {
  const records = [
    { id: 1, lawyer: "John Doe", caseTitle: "Property Dispute", startDate: "Jan 10, 2024", hearingDate: "Feb 20, 2024", result: "Won" },
    { id: 2, lawyer: "Jane Smith", caseTitle: "Contract Violation", startDate: "Feb 15, 2024", hearingDate: "Mar 25, 2024", result: "Lost" },
    { id: 3, lawyer: "Michael Johnson", caseTitle: "Personal Injury Claim", startDate: "Mar 01, 2024", hearingDate: "Apr 10, 2024", result: "Pending" },
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-700 p-6">
      <div className="w-full max-w-5xl bg-gray-950 border border-amber-500 shadow-lg rounded-lg p-6 overflow-hidden">
        <h2 className="text-2xl font-bold text-amber-400 text-center mb-4">Case Records</h2>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-white text-sm md:text-base">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-2 md:p-3 border border-gray-700">Lawyer Name</th>
                <th className="p-2 md:p-3 border border-gray-700">Case Title</th>
                <th className="p-2 md:p-3 border border-gray-700">Date Started</th>
                <th className="p-2 md:p-3 border border-gray-700">Hearing Date</th>
                <th className="p-2 md:p-3 border border-gray-700">Result</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="bg-gray-800 hover:bg-gray-700 transition duration-300">
                  <td className="p-2 md:p-3 border border-gray-700 whitespace-nowrap">{record.lawyer}</td>
                  <td className="p-2 md:p-3 border border-gray-700 whitespace-nowrap">{record.caseTitle}</td>
                  <td className="p-2 md:p-3 border border-gray-700 whitespace-nowrap">{record.startDate}</td>
                  <td className="p-2 md:p-3 border border-gray-700 whitespace-nowrap">{record.hearingDate}</td>
                  <td className={`p-2 md:p-3 border border-gray-700 font-semibold rounded-lg text-center text-white whitespace-nowrap ${
                    record.result === "Won" ? "bg-green-500" :
                    record.result === "Lost" ? "bg-red-500" : "bg-amber-500"
                  }`}>
                    {record.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CaseRecords;
