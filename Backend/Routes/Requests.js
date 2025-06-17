// // // module.exports = router;
// // const mongoose = require("mongoose");
// // const express = require("express");
// // const { body, validationResult } = require("express-validator");
// // const router = express.Router();
// // const Request = require("../Models/Request.js");
// // const Client = require("../Models/ClientProfile.js");
// // const Lawyer = require("../Models/LawyerProfileSchema.js");
// // // const Client = require("../Models/ClientProfile.js");

// // // Create a request
// // // router.post("/create", async (req, res) => {
// // //   try {
// // //     const { clientId, lawyerId } = req.body;

// // //     const client = await Client.findOne({ userId: clientId });
// // //     if (!client) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Client not found",
// // //       });
// // //     }

// // //     // Validate if lawyer exists
// // //     const lawyer = await Lawyer.findById(lawyerId);
// // //     if (!lawyer) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Lawyer not found",
// // //       });
// // //     }

// // //     // Check if a request already exists
// // //     const existingRequest = await Request.findOne({
// // //       clientId,
// // //       lawyerId,
// // //       status: "pending",
// // //     });

// // //     if (existingRequest) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "A pending request already exists for this lawyer",
// // //       });
// // //     }

// // //     // Create new request
// // //     const newRequest = new Request({
// // //       clientId,
// // //       lawyerId,
// // //     });

// // //     await newRequest.save();

// // //     // Return the whole client profile data along with the request
// // //     res.status(201).json({
// // //       success: true,
// // //       message: "Request sent successfully",
// // //       data: {
// // //         request: newRequest,
// // //         clientProfile: client, // Including the full client profile in the response
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Error creating request:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Server error",
// // //       error: error.message,
// // //     });
// // //   }
// // // });

// // router.post(
// //   "/create",
// //   [
// //     body("clientId").isMongoId().withMessage("Invalid clientId"),
// //     body("userId").isMongoId().withMessage("Invalid userId"), // Changed from lawyerId
// //   ],
// //   async (req, res) => {
// //     try {
// //       // Validate input
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ success: false, errors: errors.array() });
// //       }

// //       const { clientId, userId } = req.body; // Changed from lawyerId

// //       // Check if client exists
// //       const client = await Client.findOne({ userId: clientId }).select(
// //         "name email"
// //       );
// //       if (!client) {
// //         return res.status(404).json({
// //           success: false,
// //           message: "Client not found",
// //         });
// //       }

// //       // Check if lawyer exists using userId
// //       const lawyer = await Lawyer.findOne({ userId }); // Changed from findById
// //       if (!lawyer) {
// //         return res.status(404).json({
// //           success: false,
// //           message: "Lawyer not found",
// //         });
// //       }

// //       // Check for existing pending request
// //       const existingRequest = await Request.findOne({
// //         clientId,
// //         lawyerId: userId, // Changed from lawyerId
// //         status: "pending",
// //       });
// //       if (existingRequest) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "A pending request already exists for this lawyer",
// //         });
// //       }

// //       // Create new request
// //       const newRequest = new Request({
// //         clientId,
// //         lawyerId: userId, // Store lawyer's userId
// //       });
// //       await newRequest.save();

// //       // Return response with request and client profile
// //       res.status(201).json({
// //         success: true,
// //         message: "Request sent successfully",
// //         data: {
// //           request: newRequest,
// //           clientProfile: client,
// //         },
// //       });
// //     } catch (error) {
// //       console.error("Error creating request:", error);
// //       res.status(500).json({
// //         success: false,
// //         message: "An unexpected error occurred. Please try again later.",
// //       });
// //     }
// //   }
// // );

// // // Get all requests for a client
// // router.get("/client/:clientId", async (req, res) => {
// //   try {
// //     const requests = await Request.find({ clientId: req.params.clientId })
// //       .populate("lawyerId", "name primaryPracticeArea hourlyRate")
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       data: requests,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // });
// // router.get("/lawyer/:lawyerId", async (req, res) => {
// //   try {
// //     // Use the correct parameter name from the route
// //     const lawyerId = req.params.lawyerId;

// //     // Find all requests for this lawyer
// //     const requests = await Request.find({ lawyerId: lawyerId }).sort({
// //       createdAt: -1,
// //     });

// //     // If no requests are found, return empty array
// //     if (!requests || requests.length === 0) {
// //       return res.status(200).json({
// //         success: true,
// //         data: [],
// //       });
// //     }

// //     const populatedRequests = await Promise.all(
// //       requests.map(async (request) => {
// //         try {
// //           const client = await Client.findOne({ userId: request.clientId });

// //           const requestObj = request.toObject();

// //           if (client) {
// //             requestObj.clientId = client.toObject();
// //           } else {
// //             requestObj.clientId = null;
// //           }

// //           return requestObj;
// //         } catch (error) {
// //           console.error(
// //             `Error populating client for request ${request._id}:`,
// //             error
// //           );
// //           // Return the request object with a flag indicating client fetch failed
// //           const requestObj = request.toObject();
// //           requestObj.clientFetchError = true;
// //           return requestObj;
// //         }
// //       })
// //     );

// //     res.status(200).json({
// //       success: true,
// //       data: populatedRequests,
// //     });
// //   } catch (error) {
// //     console.error("Error fetching lawyer requests:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // });

// // router.patch("/:requestId", async (req, res) => {
// //   try {
// //     const { status, message } = req.body;

// //     const updatedRequest = await Request.findByIdAndUpdate(
// //       req.params.requestId,
// //       { status, message },
// //       { new: true }
// //     ).populate("clientId"); // Also populate with full client data on updates

// //     if (!updatedRequest) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Request not found",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: `Request ${status} successfully`,
// //       data: updatedRequest,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // });

// // module.exports = router;

// // // const mongoose = require("mongoose");
// // // const express = require("express");
// // // const multer = require("multer");
// // // const path = require("path");
// // // const router = express.Router();
// // // const Request = require("../Models/Request.js");
// // // const Client = require("../Models/ClientProfile.js");
// // // const Lawyer = require("../Models/LawyerProfileSchema.js");
// // // const Document = require("../Models/Documents");

// // // // Configure multer storage for document uploads
// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, "uploads/");
// // //   },
// // //   filename: function (req, file, cb) {
// // //     cb(null, file.originalname);
// // //   },
// // // });
// // // const upload = multer({ storage });

// // // // POST: Upload a document
// // // router.post("/uploads", upload.single("file"), async (req, res) => {
// // //   const photoPath = req.file ? req.file.path : null;

// // //   try {
// // //     const { title, type, description, userId } = req.body;

// // //     if (!title || !type || !req.file || !userId) {
// // //       return res.status(400).json({ message: "Missing required fields" });
// // //     }

// // //     const newDocument = new Document({
// // //       userId,
// // //       title,
// // //       type,
// // //       description,
// // //       filePath: photoPath,
// // //     });

// // //     await newDocument.save();
// // //     res.status(201).json({
// // //       success: true,
// // //       message: "Document uploaded successfully",
// // //       data: newDocument,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Server error",
// // //       error: error.message,
// // //     });
// // //   }
// // // });

// // // // POST: Create a request
// // // router.post("/create", async (req, res) => {
// // //   try {
// // //     const { clientId, lawyerId } = req.body;

// // //     // Validate client
// // //     const client = await Client.findOne({ userId: clientId });
// // //     if (!client) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Client not found",
// // //       });
// // //     }

// // //     // Validate lawyer
// // //     const lawyer = await Lawyer.findById(lawyerId);
// // //     if (!lawyer) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Lawyer not found",
// // //       });
// // //     }

// // //     // Check for existing pending request
// // //     const existingRequest = await Request.findOne({
// // //       clientId,
// // //       lawyerId,
// // //       status: "pending",
// // //     });

// // //     if (existingRequest) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "A pending request already exists for this lawyer",
// // //       });
// // //     }

// // //     // Create new request
// // //     const newRequest = new Request({
// // //       clientId,
// // //       lawyerId,
// // //     });

// // //     await newRequest.save();

// // //     res.status(201).json({
// // //       success: true,
// // //       message: "Request sent successfully",
// // //       data: {
// // //         request: newRequest,
// // //         clientProfile: client,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Error creating request:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Server error",
// // //       error: error.message,
// // //     });
// // //   }
// // // });

// // // // router.post("/create", async (req, res) => {
// // // //   try {
// // // //     const { clientId, lawyerId } = req.body;

// // // //     const client = await Client.findOne({ userId: clientId });
// // // //     if (!client) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: "Client not found",
// // // //       });
// // // //     }

// // // //     // Validate if lawyer exists
// // // //     const lawyer = await Lawyer.findById(lawyerId);
// // // //     if (!lawyer) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: "Lawyer not found",
// // // //       });
// // // //     }

// // // //     // Check if a request already exists
// // // //     const existingRequest = await Request.findOne({
// // // //       clientId,
// // // //       lawyerId,
// // // //       status: "pending",
// // // //     });

// // // //     if (existingRequest) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "A pending request already exists for this lawyer",
// // // //       });
// // // //     }

// // // //     // Create new request
// // // //     const newRequest = new Request({
// // // //       clientId,
// // // //       lawyerId,
// // // //     });

// // // //     await newRequest.save();

// // // //     // Return the whole client profile data along with the request
// // // //     res.status(201).json({
// // // //       success: true,
// // // //       message: "Request sent successfully",
// // // //       data: {
// // // //         request: newRequest,
// // // //         clientProfile: client, // Including the full client profile in the response
// // // //       },
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error creating request:", error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Server error",
// // // //       error: error.message,
// // // //     });
// // // //   }
// // // // });

// // // // GET: Get all requests for a client
// // // router.get("/client/:clientId", async (req, res) => {
// // //   try {
// // //     const requests = await Request.find({ clientId: req.params.clientId })
// // //       .populate("lawyerId", "name primaryPracticeArea hourlyRate")
// // //       .sort({ createdAt: -1 });

// // //     res.status(200).json({
// // //       success: true,
// // //       data: requests,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Server error",
// // //       error: error.message,
// // //     });
// // //   }
// // // });

// // // // GET: Get all requests for a lawyer
// // // router.get("/lawyer/:lawyerId", async (req, res) => {
// // //   try {
// // //     const lawyerId = req.params.lawyerId;

// // //     const requests = await Request.find({ lawyerId })
// // //       .populate("clientId") // Use Mongoose populate instead of manual fetching
// // //       .sort({ createdAt: -1 });

// // //     res.status(200).json({
// // //       success: true,
// // //       data: requests,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error fetching lawyer requests:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Server error",
// // //       error: error.message,
// // //     });
// // //   }
// // // });

// // // // NEW ROUTE: Get all requests for a user (via lawyerId)
// // // router.get("/requests/user/:userId", async (req, res) => {
// // //   try {
// // //     const userId = req.params.userId;

// // //     // Validate userId format
// // //     if (!mongoose.Types.ObjectId.isValid(userId)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid userId format",
// // //       });
// // //     }

// // //     // Find lawyer profile by userId
// // //     const lawyer = await Lawyer.findOne({ userId });
// // //     if (!lawyer) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "No lawyer profile found for this user",
// // //       });
// // //     }

// // //     // Fetch requests for the lawyerId
// // //     const requests = await Request.find({ lawyerId: lawyer._id })
// // //       .populate("clientId")
// // //       .sort({ createdAt: -1 });

// // //     // Fetch the latest document for the user (optional)
// // //     const latestDocument = await Document.findOne({ userId })
// // //       .sort({ createdAt: -1 });

// // //     res.status(200).json({
// // //       success: true,
// // //       data: {
// // //         requests,
// // //         latestDocument: latestDocument || null,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Error fetching requests by userId:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Server error",
// // //       error: error.message,
// // //     });
// // //   }
// // // });

// // // // PATCH: Update a request
// // // router.patch("/:requestId", async (req, res) => {
// // //   try {
// // //     const { status, message } = req.body;

// // //     // Validate status
// // //     const validStatuses = ["pending", "accepted", "rejected"];
// // //     if (status && !validStatuses.includes(status)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
// // //       });
// // //     }

// // //     const updatedRequest = await Request.findByIdAndUpdate(
// // //       req.params.requestId,
// // //       { status, message },
// // //       { new: true }
// // //     ).populate("clientId");

// // //     if (!updatedRequest) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Request not found",
// // //       });
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       message: `Request ${status} successfully`,
// // //       data: updatedRequest,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Server error",
// // //       error: error.message,
// // //     });
// // //   }
// // // });

// // // module.exports = router;

// const mongoose = require("mongoose");
// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const router = express.Router();
// const Request = require("../Models/Request.js");
// const Client = require("../Models/ClientProfile.js");
// const Lawyer = require("../Models/LawyerProfileSchema.js");

// // Create a request
// router.post(
//   "/create",
//   [
//     body("clientId").isMongoId().withMessage("Invalid clientId"),
//     body("userId").isMongoId().withMessage("Invalid userId"),
//   ],
//   async (req, res) => {
//     try {
//       // Validate input
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() });
//       }

//       const { clientId, userId } = req.body;
//       console.log("Received request payload:", { clientId, userId });

//       // Check if client exists
//       const client = await Client.findOne({ userId: clientId }).select(
//         "name email"
//       );
//       if (!client) {
//         return res.status(404).json({
//           success: false,
//           message: "Client not found",
//         });
//       }

//       // Check if lawyer exists using userId
//       const lawyer = await Lawyer.findOne({ userId });
//       if (!lawyer) {
//         return res.status(404).json({
//           success: false,
//           message: "Lawyer not found",
//         });
//       }

//       // Check for existing pending request
//       const existingRequest = await Request.findOne({
//         clientId,
//         lawyerId: userId,
//         status: "pending",
//       });
//       if (existingRequest) {
//         return res.status(400).json({
//           success: false,
//           message: "A pending request already exists for this lawyer",
//         });
//       }

//       // Create new request
//       const newRequest = new Request({
//         clientId,
//         lawyerId: userId,
//       });
//       await newRequest.save();

//       // Return response with request and client profile
//       res.status(201).json({
//         success: true,
//         message: "Request sent successfully",
//         data: {
//           request: newRequest,
//           clientProfile: client,
//         },
//       });
//     } catch (error) {
//       console.error("Error creating request:", error);
//       res.status(500).json({
//         success: false,
//         message: "An unexpected error occurred. Please try again later.",
//       });
//     }
//   }
// );

// // Get all requests for a client
// router.get("/client/:clientId", async (req, res) => {
//   try {
//     const requests = await Request.find({ clientId: req.params.clientId })
//       .populate({
//         path: "lawyerId",
//         select: "name primaryPracticeArea hourlyRate userId",
//         match: { userId: { $exists: true } },
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: requests,
//     });
//   } catch (error) {
//     console.error("Error fetching client requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Get all requests for a lawyer (using userId)
// router.get("/lawyer/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Validate userId format
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid userId format",
//       });
//     }

//     // Find lawyer profile by userId
//     const lawyer = await Lawyer.findOne({ userId });
//     if (!lawyer) {
//       return res.status(404).json({
//         success: false,
//         message: "Lawyer not found",
//       });
//     }

//     // Find all requests for this lawyer using userId as lawyerId
//     const requests = await Request.find({ lawyerId: userId }).sort({
//       createdAt: -1,
//     });

//     // If no requests are found, return empty array
//     if (!requests || requests.length === 0) {
//       return res.status(200).json({
//         success: true,
//         data: [],
//       });
//     }

//     const populatedRequests = await Promise.all(
//       requests.map(async (request) => {
//         try {
//           const client = await Client.findOne({ userId: request.clientId });
//           const requestObj = request.toObject();
//           requestObj.clientId = client ? client.toObject() : null;
//           return requestObj;
//         } catch (error) {
//           console.error(
//             `Error populating client for request ${request._id}:`,
//             error
//           );
//           const requestObj = request.toObject();
//           requestObj.clientFetchError = true;
//           return requestObj;
//         }
//       })
//     );

//     res.status(200).json({
//       success: true,
//       data: populatedRequests,
//     });
//   } catch (error) {
//     console.error("Error fetching lawyer requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Update a request
// router.patch("/:requestId", async (req, res) => {
//   try {
//     const { status, message } = req.body;

//     // Validate status
//     const validStatuses = ["pending", "accepted", "rejected"];
//     if (status && !validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
//       });
//     }

//     const updatedRequest = await Request.findByIdAndUpdate(
//       req.params.requestId,
//       { status, message },
//       { new: true }
//     ).populate({
//       path: "clientId",
//       select: "name email",
//     });

//     if (!updatedRequest) {
//       return res.status(404).json({
//         success: false,
//         message: "Request not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: `Request ${status} successfully`,
//       data: updatedRequest,
//     });
//   } catch (error) {
//     console.error("Error updating request:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Commented out document upload route (unrelated to request functionality)
// // const multer = require("multer");
// // const path = require("path");
// // const Document = require("../Models/Documents");
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname);
// //   },
// // });
// // const upload = multer({ storage });
// // router.post("/uploads", upload.single("file"), async (req, res) => {
// //   const photoPath = req.file ? req.file.path : null;
// //   try {
// //     const { title, type, description, userId } = req.body;
// //     if (!title || !type || !req.file || !userId) {
// //       return res.status(400).json({ message: "Missing required fields" });
// //     }
// //     const newDocument = new Document({
// //       userId,
// //       title,
// //       type,
// //       description,
// //       filePath: photoPath,
// //     });
// //     await newDocument.save();
// //     res.status(201).json({
// //       success: true,
// //       message: "Document uploaded successfully",
// //       data: newDocument,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // });

// module.exports = router;


// const mongoose = require("mongoose");
// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const router = express.Router();
// const Request = require("../Models/Request.js");
// const Client = require("../Models/ClientProfile.js");
// const Lawyer = require("../Models/LawyerProfileSchema.js");
// const sendEmail = require("../utils/sendEmail"); // Import sendEmail utility

// // Create a request
// router.post(
//   "/create",
//   [
//     body("clientId").isMongoId().withMessage("Invalid clientId"),
//     body("userId").isMongoId().withMessage("Invalid userId"),
//   ],
//   async (req, res) => {
//     try {
//       // Validate input
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() });
//       }

//       const { clientId, userId } = req.body;
//       console.log("Received request payload:", { clientId, userId });

//       // Check if client exists
//       const client = await Client.findOne({ userId: clientId }).select(
//         "name email"
//       );
//       if (!client) {
//         return res.status(404).json({
//           success: false,
//           message: "Client not found",
//         });
//       }

//       // Check if lawyer exists using userId
//       const lawyer = await Lawyer.findOne({ userId });
//       if (!lawyer) {
//         return res.status(404).json({
//           success: false,
//           message: "Lawyer not found",
//         });
//       }

//       // Check for existing pending request
//       const existingRequest = await Request.findOne({
//         clientId,
//         lawyerId: userId,
//         status: "pending",
//       });
//       if (existingRequest) {
//         return res.status(400).json({
//           success: false,
//           message: "A pending request already exists for this lawyer",
//         });
//       }

//       // Create new request
//       const newRequest = new Request({
//         clientId,
//         lawyerId: userId,
//       });
//       await newRequest.save();

//       // Return response with request and client profile
//       res.status(201).json({
//         success: true,
//         message: "Request sent successfully",
//         data: {
//           request: newRequest,
//           clientProfile: client,
//         },
//       });
//     } catch (error) {
//       console.error("Error creating request:", error);
//       res.status(500).json({
//         success: false,
//         message: "An unexpected error occurred. Please try again later.",
//       });
//     }
//   }
// );

// // Get all requests for a client
// router.get("/client/:clientId", async (req, res) => {
//   try {
//     const requests = await Request.find({ clientId: req.params.clientId })
//       .populate({
//         path: "lawyerId",
//         select: "name primaryPracticeArea hourlyRate userId",
//         match: { userId: { $exists: true } },
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: requests,
//     });
//   } catch (error) {
//     console.error("Error fetching client requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Get all requests for a lawyer (using userId)
// router.get("/lawyer/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Validate userId format
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid userId format",
//       });
//     }

//     // Find lawyer profile by userId
//     const lawyer = await Lawyer.findOne({ userId });
//     if (!lawyer) {
//       return res.status(404).json({
//         success: false,
//         message: "Lawyer not found",
//       });
//     }

//     // Find all requests for this lawyer using userId as lawyerId
//     const requests = await Request.find({ lawyerId: userId }).sort({
//       createdAt: -1,
//     });

//     // If no requests are found, return empty array
//     if (!requests || requests.length === 0) {
//       return res.status(200).json({
//         success: true,
//         data: [],
//       });
//     }

//     const populatedRequests = await Promise.all(
//       requests.map(async (request) => {
//         try {
//           const client = await Client.findOne({ userId: request.clientId });
//           const requestObj = request.toObject();
//           requestObj.clientId = client ? client.toObject() : null;
//           return requestObj;
//         } catch (error) {
//           console.error(
//             `Error populating client for request ${request._id}:`,
//             error
//           );
//           const requestObj = request.toObject();
//           requestObj.clientFetchError = true;
//           return requestObj;
//         }
//       })
//     );

//     res.status(200).json({
//       success: true,
//       data: populatedRequests,
//     });
//   } catch (error) {
//     console.error("Error fetching lawyer requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Update a request
// router.patch("/:requestId", async (req, res) => {
//   try {
//     const { status, message } = req.body;

//     // Validate status
//     const validStatuses = ["pending", "accepted", "rejected"];
//     if (status && !validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
//       });
//     }

//     const updatedRequest = await Request.findByIdAndUpdate(
//       req.params.requestId,
//       { status, message },
//       { new: true }
//     ).populate({
//       path: "clientId",
//       select: "name email",
//     });

//     if (!updatedRequest) {
//       return res.status(404).json({
//         success: false,
//         message: "Request not found",
//       });
//     }

//     // Send email notification to client if status is updated to accepted or rejected
//     if (status === "accepted" || status === "rejected") {
//       const clientEmail = updatedRequest.clientId?.email;
//       if (clientEmail) {
//         const subject =
//           status === "accepted"
//             ? "Your Request Has Been Accepted"
//             : "Your Request Has Been Rejected";
//         try {
//           await sendEmail(clientEmail, subject, message);
//         } catch (emailError) {
//           console.error(`Error sending email to ${clientEmail}:`, emailError);
//           // Continue with the response even if email fails to avoid blocking the request update
//         }
//       } else {
//         console.warn(`No email found for clientId: ${updatedRequest.clientId}`);
//       }
//     }

//     res.status(200).json({
//       success: true,
//       message: `Request ${status} successfully`,
//       data: updatedRequest,
//     });
//   } catch (error) {
//     console.error("Error updating request:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Commented out document upload route (unrelated to request functionality)
// // const multer = require("multer");
// // const path = require("path");
// // const Document = require("../Models/Documents");
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname);
// //   },
// // });
// // const upload = multer({ storage });
// // router.post("/uploads", upload.single("file"), async (req, res) => {
// //   const photoPath = req.file ? req.file.path : null;
// //   try {
// //     const { title, type, description, userId } = req.body;
// //     if (!title || !type || !req.file || !userId) {
// //       return res.status(400).json({ message: "Missing required fields" });
// //     }
// //     const newDocument = new Document({
// //       userId,
// //       title,
// //       type,
// //       description,
// //       filePath: photoPath,
// //     });
// //     await newDocument.save();
// //     res.status(201).json({
// //       success: true,
// //       message: "Document uploaded successfully",
// //       data: newDocument,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // });

// module.exports = router;




// const mongoose = require("mongoose");
// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const router = express.Router();
// const Request = require("../Models/Request.js");
// const Client = require("../Models/ClientProfile.js");
// const Lawyer = require("../Models/LawyerProfileSchema.js");
// const sendEmail = require("../utils/sendEmail"); // Import sendEmail utility

// // Create a request
// router.post(
//   "/create",
//   [
//     body("clientId").isMongoId().withMessage("Invalid clientId"),
//     body("userId").isMongoId().withMessage("Invalid userId"),
//   ],
//   async (req, res) => {
//     try {
//       // Validate input
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() });
//       }

//       const { clientId, userId } = req.body;
//       console.log("Received request payload:", { clientId, userId });

//       // Check if client exists
//       const client = await Client.findOne({ userId: clientId }).select(
//         "name email"
//       );
//       if (!client) {
//         return res.status(404).json({
//           success: false,
//           message: "Client not found",
//         });
//       }

//       // Check if lawyer exists using userId
//       const lawyer = await Lawyer.findOne({ userId });
//       if (!lawyer) {
//         return res.status(404).json({
//           success: false,
//           message: "Lawyer not found",
//         });
//       }

//       // Check for existing pending request
//       const existingRequest = await Request.findOne({
//         clientId,
//         lawyerId: userId,
//         status: "pending",
//       });
//       if (existingRequest) {
//         return res.status(400).json({
//           success: false,
//           message: "A pending request already exists for this lawyer",
//         });
//       }

//       // Create new request
//       const newRequest = new Request({
//         clientId,
//         lawyerId: userId,
//       });
//       await newRequest.save();

//       // Return response with request and client profile
//       res.status(201).json({
//         success: true,
//         message: "Request sent successfully",
//         data: {
//           request: newRequest,
//           clientProfile: client,
//         },
//       });
//     } catch (error) {
//       console.error("Error creating request:", error);
//       res.status(500).json({
//         success: false,
//         message: "An unexpected error occurred. Please try again later.",
//       });
//     }
//   }
// );

// // Get all requests for a client
// router.get("/client/:clientId", async (req, res) => {
//   try {
//     const requests = await Request.find({ clientId: req.params.clientId })
//       .populate({
//         path: "lawyerId",
//         select: "name primaryPracticeArea hourlyRate userId",
//         match: { userId: { $exists: true } },
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: requests,
//     });
//   } catch (error) {
//     console.error("Error fetching client requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Get all requests for a lawyer (using userId)
// router.get("/lawyer/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Validate userId format
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid userId format",
//       });
//     }

//     // Find lawyer profile by userId
//     const lawyer = await Lawyer.findOne({ userId });
//     if (!lawyer) {
//       return res.status(404).json({
//         success: false,
//         message: "Lawyer not found",
//       });
//     }

//     // Find all requests for this lawyer using userId as lawyerId
//     const requests = await Request.find({ lawyerId: userId }).sort({
//       createdAt: -1,
//     });

//     // If no requests are found, return empty array
//     if (!requests || requests.length === 0) {
//       return res.status(200).json({
//         success: true,
//         data: [],
//       });
//     }

//     const populatedRequests = await Promise.all(
//       requests.map(async (request) => {
//         try {
//           const client = await Client.findOne({ userId: request.clientId });
//           const requestObj = request.toObject();
//           requestObj.clientId = client ? client.toObject() : null;
//           return requestObj;
//         } catch (error) {
//           console.error(
//             `Error populating client for request ${request._id}:`,
//             error
//           );
//           const requestObj = request.toObject();
//           requestObj.clientFetchError = true;
//           return requestObj;
//         }
//       })
//     );

//     res.status(200).json({
//       success: true,
//       data: populatedRequests,
//     });
//   } catch (error) {
//     console.error("Error fetching lawyer requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Update a request
// router.patch("/:requestId", async (req, res) => {
//   try {
//     const { status, message } = req.body;

//     // Validate status
//     const validStatuses = ["pending", "accepted", "rejected"];
//     if (status && !validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
//       });
//     }

//     const updatedRequest = await Request.findByIdAndUpdate(
//       req.params.requestId,
//       { status, message },
//       { new: true }
//     );

//     if (!updatedRequest) {
//       return res.status(404).json({
//         success: false,
//         message: "Request not found",
//       });
//     }

//     // Send email notification to client if status is updated to accepted or rejected
//     if (status === "accepted" || status === "rejected") {
//       // Fetch client using clientId (which is the userId in Client model)
//       const client = await Client.findOne({ userId: updatedRequest.clientId }).select("email");
//       if (client && client.email) {
//         const subject =
//           status === "accepted"
//             ? "Your Request Has Been Accepted"
//             : "Your Request Has Been Rejected";
//         try {
//           await sendEmail(client.email, subject, message);
//         } catch (emailError) {
//           console.error(`Error sending email to ${client.email}:`, emailError);
//           // Continue with the response even if email fails to avoid blocking the request update
//         }
//       } else {
//         console.warn(`No client or email found for userId: ${updatedRequest.clientId}`);
//       }
//     }

//     // Populate clientId for response
//     const populatedRequest = await Request.findById(updatedRequest._id).populate({
//       path: "clientId",
//       select: "name email",
//     });

//     res.status(200).json({
//       success: true,
//       message: `Request ${status} successfully`,
//       data: populatedRequest,
//     });
//   } catch (error) {
//     console.error("Error updating request:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// // Commented out document upload route (unrelated to request functionality)
// // const multer = require("multer");
// // const path = require("path");
// // const Document = require("../Models/Documents");
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname);
// //   },
// // });
// // const upload = multer({ storage });
// // router.post("/uploads", upload.single("file"), async (req, res) => {
// //   const photoPath = req.file ? req.file.path : null;
// //   try {
// //     const { title, type, description, userId } = req.body;
// //     if (!title || !type || !req.file || !userId) {
// //       return res.status(400).json({ message: "Missing required fields" });
// //     }
// //     const newDocument = new Document({
// //       userId,
// //       title,
// //       type,
// //       description,
// //       filePath: photoPath,
// //     });
// //     await newDocument.save();
// //     res.status(201).json({
// //       success: true,
// //       message: "Document uploaded successfully",
// //       data: newDocument,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: error.message,
// //     });
// //   }
// // });

// module.exports = router;

const mongoose = require("mongoose");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Request = require("../Models/Request.js");
const Client = require("../Models/ClientProfile.js");
const Lawyer = require("../Models/LawyerProfileSchema.js");
const sendEmail = require("../utils/sendEmail"); // Import sendEmail utility

// Create a request
router.post(
  "/create",
  [
    body("clientId").isMongoId().withMessage("Invalid clientId"),
    body("userId").isMongoId().withMessage("Invalid userId"),
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { clientId, userId } = req.body;
      console.log("Received request payload:", { clientId, userId });

      // Check if client exists
      const client = await Client.findOne({ userId: clientId }).select(
        "name email"
      );
      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }

      // Check if lawyer exists using userId
      const lawyer = await Lawyer.findOne({ userId });
      if (!lawyer) {
        return res.status(404).json({
          success: false,
          message: "Lawyer not found",
        });
      }

      // Check for existing pending request
      const existingRequest = await Request.findOne({
        clientId,
        lawyerId: userId,
        status: "pending",
      });
      if (existingRequest) {
        return res.status(400).json({
          success: false,
          message: "A pending request already exists for this lawyer",
        });
      }

      // Create new request
      const newRequest = new Request({
        clientId,
        lawyerId: userId,
      });
      await newRequest.save();

      // Return response with request and client profile
      res.status(201).json({
        success: true,
        message: "Request sent successfully",
        data: {
          request: newRequest,
          clientProfile: client,
        },
      });
    } catch (error) {
      console.error("Error creating request:", error);
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }
);

// Get all requests for a client
router.get("/client/:clientId", async (req, res) => {
  try {
    const requests = await Request.find({ clientId: req.params.clientId })
      .populate({
        path: "lawyerId",
        select: "name primaryPracticeArea hourlyRate userId",
        match: { userId: { $exists: true } },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching client requests:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Get all requests for a lawyer (using userId)
router.get("/lawyer/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
      });
    }

    // Find lawyer profile by userId
    const lawyer = await Lawyer.findOne({ userId });
    if (!lawyer) {
      return res.status(404).json({
        success: false,
        message: "Lawyer not found",
      });
    }

    // Find all requests for this lawyer using userId as lawyerId
    const requests = await Request.find({ lawyerId: userId }).sort({
      createdAt: -1,
    });

    // If no requests are found, return empty array
    if (!requests || requests.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const populatedRequests = await Promise.all(
      requests.map(async (request) => {
        try {
          const client = await Client.findOne({ userId: request.clientId });
          const requestObj = request.toObject();
          requestObj.clientId = client ? client.toObject() : null;
          return requestObj;
        } catch (error) {
          console.error(
            `Error populating client for request ${request._id}:`,
            error
          );
          const requestObj = request.toObject();
          requestObj.clientFetchError = true;
          return requestObj;
        }
      })
    );

    res.status(200).json({
      success: true,
      data: populatedRequests,
    });
  } catch (error) {
    console.error("Error fetching lawyer requests:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Update a request
router.patch("/:requestId", async (req, res) => {
  try {
    const { status, message } = req.body;

    // Validate status
    const validStatuses = ["pending", "accepted", "rejected"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.requestId,
      { status, message },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // Send email notification to client if status is updated to accepted or rejected
    let emailStatus = "not_sent";
    if (status === "accepted" || status === "rejected") {
      // Fetch client using clientId (which is the userId in Client model)
      const client = await Client.findOne({ userId: updatedRequest.clientId }).select("email");
      if (client && client.email) {
        const subject =
          status === "accepted"
            ? "Your Request Has Been Accepted"
            : "Your Request Has Been Rejected";
        try {
          await sendEmail(client.email, subject, message);
          emailStatus = "sent";
        } catch (emailError) {
          console.error(`Error sending email to ${client.email}:`, emailError);
          emailStatus = `failed: ${emailError.message}`;
        }
      } else {
        console.warn(`No client or email found for userId: ${updatedRequest.clientId}`);
        emailStatus = "no_email_found";
      }
    }

    // Populate clientId for response
    const populatedRequest = await Request.findById(updatedRequest._id).populate({
      path: "clientId",
      select: "name email",
    });

    res.status(200).json({
      success: true,
      message: `Request ${status} successfully`,
      emailStatus, // Include email status in response
      data: populatedRequest,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});



module.exports = router;