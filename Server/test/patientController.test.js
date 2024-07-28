import { expect } from "chai";
import sinon from "sinon";
import { afterEach, beforeEach, describe, it } from "mocha";
import Patient from "../models/Patient.js";
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

describe("Patient Controller", () => {
  let req, res, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getPatients", () => {
    it("should return 200 and a list of patients", async () => {
      const patients = [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }];
      sandbox.stub(Patient, "find").resolves(patients);

      await getPatients(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(patients)).to.be.true;
    });

    it("should return 500 if server error occurs", async () => {
      const error = new Error("Something went wrong");
      sandbox.stub(Patient, "find").rejects(error);

      await getPatients(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });    
  });

      // Add tests for other controller functions here...
   // Describe block for each method

   describe("getPatientByID", () => {
    it("should return 200 and patient object", async () => {
      const patient = { id: 1, name: "John Doe" };
      sandbox.stub(Patient, "findById").resolves(patient);

      req.params = { id: "1" };

      await getPatientById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(patient)).to.be.true;
    });

    it("should return 404 if patient not found", async () => {
      const patient = null;
      sandbox.stub(Patient, "findById").resolves(patient);

      req.params = { id: "1" };

      await getPatientById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith( {message: 'Patient not found'})).to.be.true;
    });  

    it("should return 500 if server error occurs", async () => {
      const error = new Error("Something went wrong");
      sandbox.stub(Patient, "findById").rejects(error);

      req.params = { id: "1" };

      await getPatientById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });    
  });


  describe("createPatient", () => {
    it("should return 201 and created a new patient", async () => {
      const patient = {id: 999, name: 'John Doe', age: 29 , height: 39, weight: 59, history: 'Diabetes', scans: 9};
      sandbox.stub(Patient.prototype, "save").resolves(patient);

      req.body = patient;

      await createPatient(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(patient)).to.be.true;
    });

    it("should return 400 if server error occurs", async () => {
      const error = new Error("Something went wrong");
      sandbox.stub(Patient.prototype, "save").rejects(error);

      await createPatient(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });    
  });

  describe("updatePatient", () => {
    it("should return 200 and update patient information", async () => {
      const patient = {id: 1, name: 'John Doe', age: 29 , height: 39, weight: 59, history: 'Diabetes', scans: 9};
      sandbox.stub(Patient, "findByIdAndUpdate").resolves(patient);

      req.params = {id: 1};
      req.body = patient;

      await updatePatient(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(patient)).to.be.true;
    });

    it("should return 404 if patient not found", async () => {
      const patient = null;
      sandbox.stub(Patient, "findByIdAndUpdate").resolves(patient);

      req.params = { id: "1" };
      await updatePatient(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith( {message: 'Patient not found'})).to.be.true;
    });  

    it("should return 400 if server error occurs", async () => {
      const error = new Error("Something went wrong");
      sandbox.stub(Patient, "findByIdAndUpdate").rejects(error);

      req.params = { id: "1" };
      await updatePatient(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });    
  });

  describe("deletePatient", () => {
    it("should delete patient", async () => {
      const patient = { id: 1, name: "John Doe" };
      sandbox.stub(Patient, "findByIdAndDelete").resolves(patient);

      req.params = {id: '1'};

      await deletePatient(req, res);

      expect(res.json.calledWith({ message: 'Patient deleted' })).to.be.true;
    });

    it("should return 404 if patient not found", async () => {
      const patient = null;
      sandbox.stub(Patient, "findByIdAndDelete").resolves(patient);

      req.params = { id: "1" };
      
      await deletePatient(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith( {message: 'Patient not found'})).to.be.true;
    }); 

    it("should return 500 if server error occurs", async () => {
      const error = new Error("Something went wrong");
      sandbox.stub(Patient, "findByIdAndDelete").rejects(error);

      req.params = { id: "1" };

      await deletePatient(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });    
  });

});
