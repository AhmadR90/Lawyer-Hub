// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ClientRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         // Get lawyer ID from localStorage
//         const user = JSON.parse(localStorage.getItem("user"));
//         // console.log("Lawyer ID:", user?.id);

//         if (!user || !user.id) {
//           setError("Lawyer authentication data not found");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:5000/api/requests/lawyer/${user.id}`
//         );

//         // console.log("Requests response:", response.data);

//         if (response.data.success) {
//           // Transform the data and fetch latest document for each client
//           const formattedRequests = await Promise.all(
//             response.data.data.map(async (req) => {
//               let latestDocument = null;
//               try {
//                 if (req.clientId?.userId) {
//                   // console.log(req.clientId.userId);
//                   const docResponse = await axios.get(
//                     `http://localhost:5000/api/documents/${req.clientId.userId}/latest`
//                   );
//                   // console.log("Document response:", docResponse.data);
//                   if (docResponse.data) {
//                     latestDocument = docResponse.data;
//                     // console.log(latestDocument)
//                   }
//                 }
//               } catch (docError) {
//                 console.error(
//                   `Error fetching document for client ${req.clientId?.userId}:`,
//                   docError
//                 );
//               }

//               return {
//                 id: req._id,
//                 name: req.clientId?.name || "Client",
//                 email: req.clientId?.email || "No email provided",
//                 phone: req.clientId?.phone || "No phone provided",
//                 address: req.clientId?.address || "Not specified",
//                 details: req.message || "No details provided",
//                 status: req.status,
//                 clientId: req.clientId?._id || req.clientId,
//                 requestId: req._id,
//                 latestDocument,
//               };
//             })
//           );

//           setRequests(formattedRequests);
//         } else {
//           setError("Failed to fetch requests");
//         }
//       } catch (err) {
//         console.error("Error fetching requests:", err);
//         setError("Error fetching requests. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Handle Accept or Reject actions
//   const handleAction = async (requestId, action) => {
//     try {
//       // Update request status through API
//       const response = await axios.patch(
//         `http://localhost:5000/api/requests/${requestId}`,
//         {
//           status: action,
//           message:
//             action === "accepted"
//               ? "Your request has been accepted. We'll contact you soon."
//               : "Your request has been rejected.",
//         }
//       );

//       if (response.data.success) {
//         // Update local state to reflect the change
//         setRequests((prevRequests) =>
//           prevRequests.map((req) =>
//             req.requestId === requestId ? { ...req, status: action } : req
//           )
//         );
//       } else {
//         alert(`Failed to ${action} request`);
//       }
//     } catch (err) {
//       console.error(`Error ${action}ing request:`, err);
//       alert(`Error ${action}ing request. Please try again.`);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-gray-700 min-h-screen flex justify-center items-center">
//         <div className="text-amber-50 text-xl">Loading requests...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-gray-700 min-h-screen flex justify-center items-center">
//         <div className="text-red-400 text-xl">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-700 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4 text-amber-50">Client Requests</h2>

//       {requests.length === 0 ? (
//         <div className="bg-gray-900 text-white p-4 shadow-md rounded-lg border border-gray-200">
//           <p className="text-center py-4">No client requests found</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {requests.map((request) => (
//             <div
//               key={request.id}
//               className="bg-gray-900 text-white p-4 shadow-md rounded-lg border border-gray-200"
//             >
//               <h3 className="text-xl font-semibold">{request.name}</h3>
//               <p className="text-gray-300">
//                 {request.email} | {request.phone}
//               </p>
//               <p className="mt-2">
//                 <strong>Address:</strong> {request.address}
//               </p>
//               <p className="mt-1">
//                 <strong>Details:</strong> {request.details}
//               </p>
//               {/* Latest Document Section */}
//               <div className="mt-4">
//                 <h4 className="text-lg font-semibold text-amber-400">
//                   Latest Document
//                 </h4>
//                 {request.latestDocument ? (
//                   <div className="p-3 bg-gray-800 text-white border border-gray-700 rounded-lg">
//                     <strong className="block text-lg">
//                       {request.latestDocument.title}
//                     </strong>
//                     <p className="text-gray-400 text-sm mb-1">
//                       {new Date(
//                         request.latestDocument.createdAt
//                       ).toLocaleString()}
//                     </p>
//                     <a
//                       href={`http://localhost:5000/${request.latestDocument.filePath}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-amber-400 hover:underline"
//                     >
//                       View Document
//                     </a>
//                   </div>
//                 ) : (
//                   <p className="text-gray-400">No documents uploaded yet.</p>
//                 )}
//               </div>
//               <div className="mt-4 flex gap-2">
//                 {request.status === "pending" ? (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//                       onClick={() =>
//                         handleAction(request.requestId, "accepted")
//                       }
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                       onClick={() =>
//                         handleAction(request.requestId, "rejected")
//                       }
//                     >
//                       Reject
//                     </button>
//                   </>
//                 ) : (
//                   <p
//                     className={`text-lg font-bold ${
//                       request.status === "accepted"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {request.status.toUpperCase()}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// export default function ClientRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         // Get lawyer ID from localStorage
//         const user = JSON.parse(localStorage.getItem("user"));
//         // console.log("Lawyer ID:", user?.id);

//         if (!user || !user.id) {
//           setError("Lawyer authentication data not found");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:5000/api/requests/lawyer/${user.id}`
//         );

//         // console.log("Requests response:", response.data);

//         if (response.data.success) {
//           // Transform the data and fetch latest document for each client
//           const formattedRequests = await Promise.all(
//             response.data.data.map(async (req) => {
//               let latestDocument = null;
//               try {
//                 if (req.clientId?.userId) {
//                   // console.log(req.clientId.userId);
//                   const docResponse = await axios.get(
//                     `http://localhost:5000/api/documents/${req.clientId.userId}/latest`
//                   );
//                   // console.log("Document response:", docResponse.data);
//                   if (docResponse.data) {
//                     latestDocument = docResponse.data;
//                     // console.log(latestDocument)
//                   }
//                 }
//               } catch (docError) {
//                 console.error(
//                   `Error fetching document for client ${req.clientId?.userId}:`,
//                   docError
//                 );
//               }

//               return {
//                 id: req._id,
//                 name: req.clientId?.name || "Client",
//                 email: req.clientId?.email || "No email provided",
//                 phone: req.clientId?.phone || "No phone provided",
//                 address: req.clientId?.address || "Not specified",
//                 details: req.message || "No details provided",
//                 status: req.status,
//                 clientId: req.clientId?._id || req.clientId,
//                 requestId: req._id,
//                 latestDocument,
//               };
//             })
//           );

//           setRequests(formattedRequests);
//         } else {
//           setError("Failed to fetch requests");
//         }
//       } catch (err) {
//         console.error("Error fetching requests:", err);
//         setError("Error fetching requests. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Handle Accept or Reject actions
//   const handleAction = async (requestId, action) => {
//     try {
//       // Update request status through API
//       const response = await axios.patch(
//         `http://localhost:5000/api/requests/${requestId}`,
//         {
//           status: action,
//           message:
//             action === "accepted"
//               ? "Your request has been accepted. We'll contact you soon."
//               : "Your request has been rejected.",
//         }
//       );

//       if (response.data.success) {
//         // Update local state to reflect the change
//         setRequests((prevRequests) =>
//           prevRequests.map((req) =>
//             req.requestId === requestId ? { ...req, status: action } : req
//           )
//         );
//         // Provide feedback including email notification
//         toast.success(
//           `Request ${action} successfully. An email has been sent to the client.`
//         );
//       } else {
//         toast.error(`Failed to ${action} request: ${response.data.message}`);
//       }
//     } catch (err) {
//       console.error(`Error ${action}ing request:`, err);
//       alert(
//         `Error ${action}ing request: ${
//           err.response?.data?.message || "Please try again."
//         }`
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-gray-700 min-h-screen flex justify-center items-center">
//         <div className="text-amber-50 text-xl">Loading requests...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-gray-700 min-h-screen flex justify-center items-center">
//         <div className="text-red-400 text-xl">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-700 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4 text-amber-50">Client Requests</h2>

//       {requests.length === 0 ? (
//         <div className="bg-gray-900 text-white p-4 shadow-md rounded-lg border border-gray-200">
//           <p className="text-center py-4">No client requests found</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {requests.map((request) => (
//             <div
//               key={request.id}
//               className="bg-gray-900 text-white p-4 shadow-md rounded-lg border border-gray-200"
//             >
//               <h3 className="text-xl font-semibold">{request.name}</h3>
//               <p className="text-gray-300">
//                 {request.email} | {request.phone}
//               </p>
//               <p className="mt-2">
//                 <strong>Address:</strong> {request.address}
//               </p>
//               <p className="mt-1">
//                 <strong>Details:</strong> {request.details}
//               </p>
//               {/* Latest Document Section */}
//               <div className="mt-4">
//                 <h4 className="text-lg font-semibold text-amber-400">
//                   Latest Document
//                 </h4>
//                 {request.latestDocument ? (
//                   <div className="p-3 bg-gray-800 text-white border border-gray-700 rounded-lg">
//                     <strong className="block text-lg">
//                       {request.latestDocument.title}
//                     </strong>
//                     <p className="text-gray-400 text-sm mb-1">
//                       {new Date(
//                         request.latestDocument.createdAt
//                       ).toLocaleString()}
//                     </p>
//                     <a
//                       href={`http://localhost:5000/${request.latestDocument.filePath}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-amber-400 hover:underline"
//                     >
//                       View Document
//                     </a>
//                   </div>
//                 ) : (
//                   <p className="text-gray-400">No documents uploaded yet.</p>
//                 )}
//               </div>
//               <div className="mt-4 flex gap-2">
//                 {request.status === "pending" ? (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//                       onClick={() =>
//                         handleAction(request.requestId, "accepted")
//                       }
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                       onClick={() =>
//                         handleAction(request.requestId, "rejected")
//                       }
//                     >
//                       Reject
//                     </button>
//                   </>
//                 ) : (
//                   <p
//                     className={`text-lg font-bold ${
//                       request.status === "accepted"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {request.status.toUpperCase()}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function ClientRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Get lawyer ID from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log("Lawyer ID:", user?.id);

        if (!user || !user.id) {
          setError("Lawyer authentication data not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/requests/lawyer/${user.id}`
        );

        // console.log("Requests response:", response.data);

        if (response.data.success) {
          // Transform the data and fetch latest document for each client
          const formattedRequests = await Promise.all(
            response.data.data.map(async (req) => {
              let latestDocument = null;
              try {
                if (req.clientId?.userId) {
                  // console.log(req.clientId.userId);
                  const docResponse = await axios.get(
                    `http://localhost:5000/api/documents/${req.clientId.userId}/latest`
                  );
                  // console.log("Document response:", docResponse.data);
                  if (docResponse.data) {
                    latestDocument = docResponse.data;
                    // console.log(latestDocument)
                  }
                }
              } catch (docError) {
                console.error(
                  `Error fetching document for client ${req.clientId?.userId}:`,
                  docError
                );
              }

              return {
                id: req._id,
                name: req.clientId?.name || "Client",
                email: req.clientId?.email || "No email provided",
                phone: req.clientId?.phone || "No phone provided",
                address: req.clientId?.address || "Not specified",
                details: req.message || "No details provided",
                status: req.status,
                clientId: req.clientId?._id || req.clientId,
                requestId: req._id,
                latestDocument,
              };
            })
          );

          setRequests(formattedRequests);
        } else {
          setError("Failed to fetch requests");
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Error fetching requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle Accept or Reject actions
  const handleAction = async (requestId, action) => {
    try {
      // Update request status through API
      const response = await axios.patch(
        `http://localhost:5000/api/requests/${requestId}`,
        {
          status: action,
          message:
            action === "accepted"
              ? "Your request has been accepted. We'll contact you soon."
              : "Your request has been rejected.",
        }
      );

      if (response.data.success) {
        // Update local state to reflect the change
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.requestId === requestId ? { ...req, status: action } : req
          )
        );
        // Provide feedback based on email status
        const emailMessage =
          response.data.emailStatus === "sent"
            ? "An email has been sent to the client."
            : response.data.emailStatus === "no_email_found"
            ? "No email address found for the client."
            : `Failed to send email: ${response.data.emailStatus}`;
        toast.success(`Request ${action} successfully. ${emailMessage}`);
      } else {
        toast.error(`Failed to ${action} request: ${response.data.message}`);
      }
    } catch (err) {
      console.error(`Error ${action}ing request:`, err);
      toast.error(
        `Error ${action}ing request: ${
          err.response?.data?.message || "Please try again."
        }`
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-700 min-h-screen flex justify-center items-center">
        <div className="text-amber-50 text-xl">Loading requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-700 min-h-screen flex justify-center items-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-700 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-amber-50">Client Requests</h2>

      {requests.length === 0 ? (
        <div className="bg-gray-900 text-white p-4 shadow-md rounded-lg border border-gray-200">
          <p className="text-center py-4">No client requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-gray-900 text-white p-4 shadow-md rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold">{request.name}</h3>
              <p className="text-gray-300">
                {request.email} | {request.phone}
              </p>
              <p className="mt-2">
                <strong>Address:</strong> {request.address}
              </p>
              <p className="mt-1">
                <strong>Details:</strong> {request.details}
              </p>
              {/* Latest Document Section */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-amber-400">
                  Latest Document
                </h4>
                {request.latestDocument ? (
                  <div className="p-3 bg-gray-800 text-white border border-gray-700 rounded-lg">
                    <strong className="block text-lg">
                      {request.latestDocument.title}
                    </strong>
                    <p className="text-gray-400 text-sm mb-1">
                      {new Date(
                        request.latestDocument.createdAt
                      ).toLocaleString()}
                    </p>
                    <a
                      href={`http://localhost:5000/${request.latestDocument.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline"
                    >
                      View Document
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-400">No documents uploaded yet.</p>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                {request.status === "pending" ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={() =>
                        handleAction(request.requestId, "accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() =>
                        handleAction(request.requestId, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <p
                    className={`text-lg font-bold ${
                      request.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {request.status.toUpperCase()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
