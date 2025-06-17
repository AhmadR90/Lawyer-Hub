const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for lawyer profiles
const LawyerProfileSchema = new Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  
  // Professional Information
  barNumber: {
    type: String,
    required: [true, 'Bar number is required'],
    trim: true,
    unique: true
  },
  yearsOfExperience: {
    type: String,
    required: [true, 'Years of experience is required'],
    enum: ['0-2', '3-5', '6-10', '11-15', '16-20', '20+']
  },
  primaryCourtType: {
    type: String,
    required: [true, 'Primary court type is required'],
    enum: ['Supreme Court', 'High Court', 'District Court', 'Family Court', 'Criminal Court', 'Civil Court', 'Tax Court', 'Bankruptcy Court']
  },
  
  primaryPracticeArea: {
    type: String,
    required: [true, 'Primary practice area is required'],
    enum: ['Criminal Law', 'Family Law', 'Corporate Law', 'Intellectual Property', 'Immigration Law', 'Real Estate', 'Tax Law', 'Labor Law', 'Environmental Law', 'Personal Injury']
  },
  
  
  // Fee Structure
  consultationFee: {
    type: String,
    required: [true, 'Consultation fee is required'],
    enum: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500']
  },
  hourlyRate: {
    type: String,
    required: [true, 'Hourly rate is required'],
    enum: ['100', '150', '200', '250', '300', '350', '400', '450', '500', '600', '700', '800', '900', '10000']
  },
  preferredCaseType: {
    type: String,
    required: [true, 'Preferred case type is required'],
    enum: ['Consultation', 'Document Review', 'Contract Drafting', 'Court Representation', 'Negotiation', 'Mediation', 'Legal Research', 'Criminal Defense', 'Divorce Proceedings', 'Estate Planning']
  },
  
  // Additional Information
  education: {
    type: String,
    trim: true
  },
  biography: {
    type: String,
    trim: true
  },
  primaryLanguage: {
    type: String,
    enum: ['English', 'Urdu','Punjabi','pashto','Balochi'],
  },
 
  
  // System fields
  isVerified: {
    type: Boolean,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  profileStatus: {
    type: String,
    enum: ['Active', 'Suspended', 'Pending Verification', 'Inactive'],
    default: 'Pending Verification'
  },
  cases:{
    type:String,
    required:[true,'Cases are required'],
  },
  won:{
    type:String,
    required:[true,'Won cases are required'],
  },
  lost:{
    type:String,
    required:[true,'Lost cases are required'],
  },
  pending:{
    type:String,
    required:[true,'Pending cases are required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  
});

// Add pre-save hook to update lastUpdated timestamp
LawyerProfileSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Create a virtual for full profile URL
LawyerProfileSchema.virtual('profileUrl').get(function() {
  return `/lawyers/${this._id}`;
});

// Method to check if profile is complete
LawyerProfileSchema.methods.isProfileComplete = function() {
  const requiredFields = [
    'name', 'email', 'phone', 'address', 'barNumber', 
    'yearsOfExperience', 'primaryCourtType', 'primaryPracticeArea',
    'consultationFee', 'hourlyRate', 'preferredCaseType','education','biography','primaryLanguage','cases','won','lost','pending','userId'
  ];
  
  return requiredFields.every(field => Boolean(this[field]));
};

// Create the model from the schema and export it
const LawyerProfile = mongoose.model('LawyerProfile', LawyerProfileSchema);

module.exports = LawyerProfile;