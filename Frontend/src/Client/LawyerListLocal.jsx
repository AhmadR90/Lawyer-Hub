// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// const LawyerList = () => {
//   const [lawyers, setLawyers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     const fetchLawyers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/lawyers/getAll");
//         setLawyers(res.data.data);
//         console.log("Fetched lawyers:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching lawyers:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLawyers();
//   }, []);

//   const handleSendRequest = async (userId) => {
//     try {
//       // Get user data from local storage
//       const user = JSON.parse(localStorage.getItem("user"));
//       console.log(user.id);
//       if (!user || !user.id) {
//         setSnackbarMessage("User not found. Please login first.");
//         setSnackbarSeverity("error");
//         setSnackbarOpen(true);
//         return;
//       }

//       // Send request with lawyer's userId and clientId
//       const response = await axios.post(
//         "http://localhost:5000/api/requests/create",
//         {
//           userId, // Already receiving userId
//           clientId: user.id,
//         }
//       );

//       if (response.data.success) {
//         console.log(response.data.data);
//         setSnackbarMessage("Request sent successfully!");
//         setSnackbarSeverity("success");
//       } else {
//         setSnackbarMessage(response.data.message || "Failed to send request");
//         setSnackbarSeverity("error");
//       }
//     } catch (error) {
//       console.error("Error sending request:", error);
//       setSnackbarMessage(
//         error.response?.data?.message || "Error sending request"
//       );
//       setSnackbarSeverity("error");
//     } finally {
//       setSnackbarOpen(true);
//     }
//   };

//   const handleCloseSnackbar = () => setSnackbarOpen(false);

//   if (loading) {
//     return (
//       <Grid container justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Grid>
//     );
//   }

//   return (
//     <div
//       style={{
//         backgroundColor: "#111827",
//         padding: "2rem",
//         marginBottom: "2rem",
//       }}
//     >
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ color: "#f59e0b", fontWeight: "bold", marginBottom: "2rem" }}
//       >
//         Our Verified Lawyers
//       </Typography>

//       <Grid container spacing={3} justifyContent="center">
//         {lawyers.map((lawyer) => (
//           <Grid item xs={12} sm={6} md={4} key={lawyer._id}>
//             <Card
//               elevation={6}
//               sx={{
//                 backgroundColor: "#0f172a",
//                 color: "white",
//                 border: "1px solid #f59e0b",
//                 borderRadius: "1rem",
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h6" sx={{ color: "#fcd34d" }}>
//                   {lawyer.name}
//                 </Typography>
//                 <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
//                   <strong>Expertise:</strong> {lawyer.primaryPracticeArea}
//                 </Typography>
//                 <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
//                   <strong>Court:</strong> {lawyer.primaryCourtType}
//                 </Typography>
//                 <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
//                   <strong>Experience:</strong> {lawyer.yearsOfExperience} years
//                 </Typography>
//                 <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
//                   <strong>Rate:</strong> Rs {lawyer.hourlyRate}/hour
//                 </Typography>

//                 <Button
//                   sx={{
//                     marginTop: "1rem",
//                     backgroundColor: "#f59e0b",
//                     color: "white",
//                     borderRadius: "9999px",
//                     width: "100%",
//                     "&:hover": {
//                       backgroundColor: "#d97706",
//                     },
//                   }}
//                   onClick={() => handleSendRequest(lawyer.userId)} // Changed from lawyer._id to lawyer.userId
//                 >
//                   Send Request
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default LawyerList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Link,
} from "@mui/material";

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/lawyers/getAll");
        const lawyersData = res.data.data;

        // Fetch latest document for each lawyer
        const lawyersWithDocuments = await Promise.all(
          lawyersData.map(async (lawyer) => {
            let latestDocument = null;
            try {
              if (lawyer.userId) {
                console.log(lawyer.userId);
                const docResponse = await axios.get(
                  `http://localhost:5000/api/documents/${lawyer.userId}/latest`
                );
                if (docResponse.data) {
                  latestDocument = docResponse.data;
                }
              }
            } catch (docError) {
              console.error(
                `Error fetching document for lawyer ${lawyer.userId}:`,
                docError
              );
            }
            return { ...lawyer, latestDocument };
          })
        );

        setLawyers(lawyersWithDocuments);
        console.log("Fetched lawyers with documents:", lawyersWithDocuments);
      } catch (error) {
        console.error("Error fetching lawyers:", error.message);
        setSnackbarMessage("Failed to load lawyers");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const handleSendRequest = async (userId) => {
    try {
      // Get user data from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Client ID:", user?.id);
      if (!user || !user.id) {
        setSnackbarMessage("User not found. Please login first.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      // Send request with lawyer's userId and clientId
      console.log("Sending request with payload:", {
        clientId: user.id,
        userId,
      });
      const response = await axios.post(
        "http://localhost:5000/api/requests/create",
        {
          userId,
          clientId: user.id,
        }
      );

      if (response.data.success) {
        console.log("Request response:", response.data.data);
        setSnackbarMessage("Request sent successfully!");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage(response.data.message || "Failed to send request");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Error sending request"
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  if (loading) {
    return (
      <Grid container justifyContent="center" mt={4}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#111827",
        padding: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#f59e0b", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Our Verified Lawyers
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {lawyers.map((lawyer) => (
          <Grid item xs={12} sm={6} md={4} key={lawyer._id}>
            <Card
              elevation={6}
              sx={{
                backgroundColor: "#0f172a",
                color: "white",
                border: "1px solid #f59e0b",
                borderRadius: "1rem",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "#fcd34d" }}>
                  {lawyer.name}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
                  <strong>Expertise:</strong> {lawyer.primaryPracticeArea}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
                  <strong>Court:</strong> {lawyer.primaryCourtType}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
                  <strong>Experience:</strong> {lawyer.yearsOfExperience} years
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
                  <strong>Rate:</strong> Rs {lawyer.hourlyRate}/hour
                </Typography>
                {/* Latest Document Section */}
                <Box sx={{ marginTop: "1rem" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#f59e0b", fontWeight: "bold" }}
                  >
                    Latest Document
                  </Typography>
                  {lawyer.latestDocument ? (
                    <Box
                      sx={{
                        padding: "0.75rem",
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "medium", color: "white" }}
                      >
                        {lawyer.latestDocument.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#9ca3af",
                          fontSize: "0.75rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {new Date(
                          lawyer.latestDocument.createdAt
                        ).toLocaleString()}
                      </Typography>
                      <Link
                        href={`http://localhost:5000/${lawyer.latestDocument.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#f59e0b",
                          textDecoration: "underline",
                          "&:hover": { color: "#d97706" },
                          fontSize: "0.875rem",
                        }}
                      >
                        View Document
                      </Link>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ color: "#9ca3af", marginTop: "0.5rem" }}
                    >
                      No documents uploaded yet.
                    </Typography>
                  )}
                </Box>
                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    borderRadius: "9999px",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#d97706",
                    },
                  }}
                  onClick={() => handleSendRequest(lawyer.userId)}
                >
                  Send Request
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LawyerList;
