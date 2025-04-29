import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { FileText, Download, Upload, Calendar, Clock } from "lucide-react";
import { useAppSelector } from "../../../hooks";

export default function MedicalRecords() {
  const user  = useAppSelector((state) =>state.auth.user);
  const patient = user;
  const navigate = useNavigate();
  
  // Demo data for medical records
  const medicalRecords = [
    {
      id: "rec1",
      name: "Blood Test Results",
      date: new Date("2025-03-15"),
      doctor: "Dr. Sarah Smith",
      type: "Lab Results",
      fileSize: "1.2 MB"
    },
    {
      id: "rec2",
      name: "Chest X-Ray",
      date: new Date("2024-11-20"),
      doctor: "Dr. Michael Johnson",
      type: "Radiology",
      fileSize: "3.5 MB"
    },
    {
      id: "rec3",
      name: "Annual Checkup Report",
      date: new Date("2024-09-05"),
      doctor: "Dr. Emily Clarke",
      type: "General Report",
      fileSize: "850 KB"
    }
  ];
  
  // Demo data for prescriptions
  const prescriptions = [
    {
      id: "presc1",
      doctorName: "Dr. Sarah Smith",
      specialization: "Cardiologist",
      date: new Date("2025-04-10"),
      expiryDate: new Date("2025-07-10"),
      medications: ["Atorvastatin 10mg", "Aspirin 75mg"],
      instructions: "Take one tablet of each medication daily after food"
    },
    {
      id: "presc2",
      doctorName: "Dr. Michael Johnson",
      specialization: "Dermatologist",
      date: new Date("2025-03-22"),
      expiryDate: new Date("2025-06-22"),
      medications: ["Cetrizine 10mg", "Fluticasone cream"],
      instructions: "Take Cetrizine once daily. Apply cream twice daily to affected areas."
    },
    {
      id: "presc3",
      doctorName: "Dr. Emily Clarke",
      specialization: "General Physician",
      date: new Date("2025-03-05"),
      expiryDate: new Date("2025-04-05"),
      medications: ["Amoxicillin 500mg", "Ibuprofen 400mg"],
      instructions: "Take Amoxicillin three times daily. Take Ibuprofen as needed for pain."
    }
  ];
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto">
<h1 className="bg-primary text-2xl font-bold">Medical Documents</h1>
<p className="text-gray-500 text-sm mt-1">View and manage your medical records and prescriptions</p>
           

            {/* Main Content */}
            <main className="flex-1  py-6 space-y-6 bg-muted">
              <Tabs defaultValue="records">
              <TabsList className="mb-6 border-b border-gray-200">
  <TabsTrigger
    value="records"
    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-white 
               data-[state=inactive]:bg-gray-100 px-4 py-2 text-sm font-medium border-r border-gray-200 
               transition-colors duration-200"
  >
    Medical Records
  </TabsTrigger>
  <TabsTrigger
    value="prescriptions"
    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-white 
               data-[state=inactive]:bg-gray-100 px-4 py-2 text-sm font-medium border-r border-gray-200 
               transition-colors duration-200"
  >
    Prescriptions
  </TabsTrigger>
</TabsList>

                
                <TabsContent value="records" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Your Medical Records</CardTitle>
                        <Button className="bg-medical-secondary text-white hover:bg-medical-secondary/90">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload New Record
                        </Button>
                      </div>
                      <CardDescription className="text-gray-500 ">Access and manage your medical history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="all">
                      <TabsList className="mb-4">
  <TabsTrigger
    value="all"
    className="bg-gray-200 data-[state=active]:bg-white data-[state=active]:text-primary text-gray-500"
  >
    All Records
  </TabsTrigger>
  <TabsTrigger
    value="lab"
    className="bg-gray-200 data-[state=active]:bg-white data-[state=active]:text-primary text-gray-500"
  >
    Lab Results
  </TabsTrigger>
  <TabsTrigger
    value="radiology"
    className="bg-gray-200 data-[state=active]:bg-white data-[state=active]:text-primary text-gray-500"
  >
    Radiology
  </TabsTrigger>
  <TabsTrigger
    value="reports"
    className="bg-gray-200 data-[state=active]:bg-white data-[state=active]:text-primary text-gray-500"
  >
    General Reports
  </TabsTrigger>
</TabsList>


                        
                        <TabsContent value="all" className="space-y-4">
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow className="text-gray-500">
                                  <TableHead>Record Name</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Doctor</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Size</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {medicalRecords.map((record) => (
                                  <TableRow key={record.id}>
                                    <TableCell className="font-medium">
                                      <div className="flex items-center">
                                        <FileText className="mr-2 h-4 w-4 text-medical-blue" />
                                        {record.name}
                                      </div>
                                    </TableCell>
                                    <TableCell>{formatDate(record.date)}</TableCell>
                                    <TableCell>{record.doctor}</TableCell>
                                    <TableCell>{record.type}</TableCell>
                                    <TableCell>{record.fileSize}</TableCell>
                                    <TableCell>
                                      <Button variant="ghost" size="sm" className="bg-gray-100 text-black hover:bg-medical-sky hover:text-white">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          
                          {medicalRecords.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium">No Medical Records</h3>
                              <p className="text-muted-foreground mt-2 mb-4">
                                You haven't uploaded any medical records yet
                              </p>
                              <Button>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Your First Record
                              </Button>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="lab">
                          <div className="text-center py-6">
                            <p>Filtered lab results will appear here</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="radiology">
                          <div className="text-center py-6">
                            <p>Filtered radiology results will appear here</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="reports">
                          <div className="text-center py-6">
                            <p>Filtered general reports will appear here</p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="prescriptions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Prescriptions</CardTitle>
                      <CardDescription className="text-gray-500">Your currently active medication prescriptions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow className="text-gray-500">
                              <TableHead>Doctor</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Medications</TableHead>
                              <TableHead>Valid Until</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {prescriptions.map((prescription) => (
                              <TableRow key={prescription.id}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{prescription.doctorName}</p>
                                    <p className="text-sm text-muted-foreground text-gray-500">{prescription.specialization}</p>
                                  </div>
                                </TableCell>
                                <TableCell>{formatDate(prescription.date)}</TableCell>
                                <TableCell>
                                  <div>
                                    {prescription.medications.map((medication, index) => (
                                      <p key={index} className="text-sm">
                                        {medication}
                                      </p>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell>{formatDate(prescription.expiryDate)}</TableCell>
                                <TableCell className="space-x-2">
                                  <Button variant="outline" size="sm" >
                                    <FileText className="mr-2 h-4 w-4 bg-gray-100 text-black hover:bg-medical-sky hover:text-white" />
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm" className="bg-gray-100 text-black hover:bg-medical-sky hover:text-white">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
    
  );
}