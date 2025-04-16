// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "../../../ui/Card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../ui/tabs";
// import { Input } from "../../../ui/Input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../ui/Select";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "../../../ui/Table";
// import { Avatar, AvatarFallback } from "../../../ui/Avatar";
// import { Badge } from "../../../ui/Badge";
// import { Button } from "../../../ui/Button";
// import { Search, Download } from "lucide-react";

// const UserManagement = () => {
//   return (
//     <div className="space-y-6">

//       <Card>
//         <CardHeader>
//           <CardTitle>User Management</CardTitle>
//           <CardDescription>Manage system users</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Tabs defaultValue="all">
//             {/* Filters */}
//             <div className="flex items-center justify-between mb-4">
//               <TabsList>
//                 <TabsTrigger value="all">All Users</TabsTrigger>
//                 <TabsTrigger value="patients">Patients</TabsTrigger>
//                 <TabsTrigger value="doctors">Doctors</TabsTrigger>
//                 <TabsTrigger value="admins">Admins</TabsTrigger>
//               </TabsList>
//               <div className="flex items-center gap-2">
//                 <div className="relative">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     type="search"
//                     placeholder="Search users..."
//                     className="pl-8 w-[250px]"
//                   />
//                 </div>
//                 <Select defaultValue="active">
//                   <SelectTrigger className="w-[120px]">
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All</SelectItem>
//                     <SelectItem value="active">Active</SelectItem>
//                     <SelectItem value="inactive">Inactive</SelectItem>
//                     <SelectItem value="suspended">Suspended</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* All Users Table */}
//             <TabsContent value="all" className="mt-0">
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>User</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead>Role</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {/* User 1 */}
//                     <TableRow>
//                       <TableCell>
//                         <div className="flex items-center">
//                           <Avatar className="h-8 w-8 mr-2">
//                             <AvatarFallback>JD</AvatarFallback>
//                           </Avatar>
//                           <span>John Doe</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>john.doe@example.com</TableCell>
//                       <TableCell>
//                         <Badge variant="outline">Patient</Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
//                       </TableCell>
//                       <TableCell className="text-right space-x-2">
//                         <Button variant="ghost" size="sm">View</Button>
//                         <Button variant="ghost" size="sm">Edit</Button>
//                       </TableCell>
//                     </TableRow>

//                     {/* User 2 */}
//                     <TableRow>
//                       <TableCell>
//                         <div className="flex items-center">
//                           <Avatar className="h-8 w-8 mr-2">
//                             <AvatarFallback>SS</AvatarFallback>
//                           </Avatar>
//                           <span>Dr. Sarah Smith</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>sarah.smith@example.com</TableCell>
//                       <TableCell>
//                         <Badge variant="outline">Doctor</Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
//                       </TableCell>
//                       <TableCell className="text-right space-x-2">
//                         <Button variant="ghost" size="sm">View</Button>
//                         <Button variant="ghost" size="sm">Edit</Button>
//                       </TableCell>
//                     </TableRow>

//                     {/* User 3 */}
//                     <TableRow>
//                       <TableCell>
//                         <div className="flex items-center">
//                           <Avatar className="h-8 w-8 mr-2">
//                             <AvatarFallback>AU</AvatarFallback>
//                           </Avatar>
//                           <span>Admin User</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>admin@example.com</TableCell>
//                       <TableCell>
//                         <Badge variant="outline">Admin</Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
//                       </TableCell>
//                       <TableCell className="text-right space-x-2">
//                         <Button variant="ghost" size="sm">View</Button>
//                         <Button variant="ghost" size="sm">Edit</Button>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </div>
//             </TabsContent>

//             {/* Patients Tab */}
//             <TabsContent value="patients">
//               <div className="py-6 text-center text-muted-foreground">
//                 Patient user list would appear here
//               </div>
//             </TabsContent>

//             {/* Doctors Tab */}
//             <TabsContent value="doctors">
//               <div className="py-6 text-center text-muted-foreground">
//                 Doctor user list would appear here
//               </div>
//             </TabsContent>

//             {/* Admins Tab */}
//             <TabsContent value="admins">
//               <div className="py-6 text-center text-muted-foreground">
//                 Admin user list would appear here
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>

//         <CardFooter className="flex items-center justify-between">
//           <div className="text-sm text-muted-foreground">
//             Showing 3 of 1,258 users
//           </div>
//           <Button variant="outline" size="sm" className="flex items-center gap-2">
//             <Download className="h-4 w-4" />
//             <span>Export Users</span>
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default UserManagement;



import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../ui/tabs";
import { Input } from "../../../ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../ui/Select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../ui/Table";
import { Avatar, AvatarFallback } from "../../../ui/Avatar";
import { Badge } from "../../../ui/Badge";
import { Button } from "../../../ui/Button";
import { Search, Download } from "lucide-react";

const UserManagement = () => {
  return (
    <div className="space-y-2 sm:space-y-2">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">User Management</CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-400">
          Manage system users
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            {/* <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="px-2 sm:px-4 py-1 text-xs sm:text-sm">All</TabsTrigger>
              <TabsTrigger value="patients" className="px-2 sm:px-4 py-1 text-xs sm:text-sm">Patients</TabsTrigger>
              <TabsTrigger value="doctors" className="px-2 sm:px-4 py-1 text-xs sm:text-sm">Doctors</TabsTrigger>
              <TabsTrigger value="admins" className="px-2 sm:px-4 py-1 text-xs sm:text-sm">Admins</TabsTrigger>
            </TabsList> */}
            <TabsList className="w-full sm:w-auto bg-gray-100 rounded-md p-1 flex gap-1">
  <TabsTrigger
    value="all"
    className="data-[state=active]:bg-gray-300 bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm px-3 py-1 rounded-md"
  >
    All
  </TabsTrigger>
  <TabsTrigger
    value="patients"
    className="data-[state=active]:bg-gray-300 bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm px-3 py-1 rounded-md"
  >
    Patients
  </TabsTrigger>
  <TabsTrigger
    value="doctors"
    className="data-[state=active]:bg-gray-300 bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm px-3 py-1 rounded-md"
  >
    Doctors
  </TabsTrigger>
  <TabsTrigger
    value="admins"
    className="data-[state=active]:bg-gray-300 bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm px-3 py-1 rounded-md"
  >
    Admins
  </TabsTrigger>
</TabsList>

            {/* <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2"> */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">

              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full sm:w-[200px] md:w-[250px]"
                />
              </div>
              <Select defaultValue="active">
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* All Users Table */}
          <TabsContent value="all" className="mt-0">
            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-[600px] sm:min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* User 1 */}
                  <TableRow>
                    {/* <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 rounded-full mr-2 bg-gray-200 text-gray-700 text-sm font-medium">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                      </div>
                    </TableCell> */}
                    <TableCell>
  <div className="flex items-center gap-2">
    <Avatar className="h-9 w-9 rounded-full bg-gray-100 text-gray-700">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <span className="text-sm font-medium text-gray-800">John Doe</span>
  </div>
</TableCell>
                    <TableCell className="text-sm">john.doe@example.com</TableCell>
                    <TableCell>
                      <Badge variant="outline">Patient</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1 sm:space-x-2">
                      <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* User 2 */}
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9 rounded-full bg-gray-100 text-gray-700">
                          <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-800">Dr. Sarah Smith</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">sarah.smith@example.com</TableCell>
                    <TableCell>
                      <Badge variant="outline">Doctor</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1 sm:space-x-2">
                      <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* User 3 */}
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9 rounded-full bg-gray-100 text-gray-700">
                          <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-800">Admin User</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">admin@example.com</TableCell>
                    <TableCell>
                      <Badge variant="outline">Admin</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1 sm:space-x-2">
                      <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="patients">
            <div className="py-6 text-center text-gray-400">
              Patient user list would appear here
            </div>
          </TabsContent>
          <TabsContent value="doctors">
            <div className="py-6 text-center text-gray-400">
              Doctor user list would appear here
            </div>
          </TabsContent>
          <TabsContent value="admins">
            <div className="py-6 text-center text-gray-400">
              Admin user list would appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-sm text-gray-500">
          Showing 3 of 1,258 users
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Export Users</span>
        </Button>
      </CardFooter> */}
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
  <div className="text-sm text-gray-500">
    Showing 3 of 1,258 users
  </div>
  <Button variant="outline" size="sm" className="flex items-center gap-2 px-3 py-1.5 rounded-md">
    <Download className="h-4 w-4" />
    <span>Export Users</span>
  </Button>
</CardFooter>

    </div>
  );
};

export default UserManagement;