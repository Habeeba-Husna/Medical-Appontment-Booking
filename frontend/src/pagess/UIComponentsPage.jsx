import React from 'react';
import { useToast } from '../hooks/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/Card';
import {Button} from '../components/ui/Button';
import {Input} from '../components/ui/Input';
import { Label } from '../components/ui/label';
import {Badge} from '../components/ui/Badge';

const UIComponentsPage = () => {
  const { toast } = useToast();
  
  const showToast = (message) => {
    toast({
      title: "Notification",
      description: message,
    });
  };
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">UI Component Library</h1>
      
      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Cards Tab */}
        <TabsContent value="cards" className="space-y-6">
          <h2 className="text-2xl font-semibold">Card Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>A basic card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the content area of the card where you can display information.</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" onClick={() => showToast("Card action clicked!")}>
                  Action
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-medical-light border-medical-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-medical-primary">Styled Card</CardTitle>
                <CardDescription>Custom styled card example</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge>New</Badge>
                    <span>Custom styled components</span>
                  </div>
                  <p className="text-gray-600">Customize cards with your theme colors and styles</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button onClick={() => showToast("Styled card action!")}>Submit</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Inputs Tab */}
        <TabsContent value="inputs" className="space-y-6">
          <h2 className="text-2xl font-semibold">Input Components</h2>
          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
              <CardDescription>Various input elements for forms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-input">Default Input</Label>
                <Input id="default-input" placeholder="Enter text here..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-input">Email Input</Label>
                <Input id="email-input" type="email" placeholder="email@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="disabled-input">Disabled Input</Label>
                <Input id="disabled-input" disabled value="This input is disabled" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="with-icon">Input with Action</Label>
                <div className="flex gap-2">
                  <Input id="with-icon" placeholder="Search..." className="flex-1" />
                  <Button onClick={() => showToast("Search action triggered!")}>
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Buttons Tab */}
        <TabsContent value="buttons" className="space-y-6">
          <h2 className="text-2xl font-semibold">Button Variants</h2>
          <Card>
            <CardHeader>
              <CardTitle>Button Styles</CardTitle>
              <CardDescription>Different button variations available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Button onClick={() => showToast("Default button clicked")}>
                    Default
                  </Button>
                  <span className="text-sm text-gray-500">Default</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button variant="secondary" onClick={() => showToast("Secondary button clicked")}>
                    Secondary
                  </Button>
                  <span className="text-sm text-gray-500">Secondary</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button variant="outline" onClick={() => showToast("Outline button clicked")}>
                    Outline
                  </Button>
                  <span className="text-sm text-gray-500">Outline</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button variant="ghost" onClick={() => showToast("Ghost button clicked")}>
                    Ghost
                  </Button>
                  <span className="text-sm text-gray-500">Ghost</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button variant="link" onClick={() => showToast("Link button clicked")}>
                    Link
                  </Button>
                  <span className="text-sm text-gray-500">Link</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button variant="destructive" onClick={() => showToast("Destructive button clicked")}>
                    Destructive
                  </Button>
                  <span className="text-sm text-gray-500">Destructive</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button disabled>
                    Disabled
                  </Button>
                  <span className="text-sm text-gray-500">Disabled</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Button 
                    className="bg-medical-primary hover:bg-medical-secondary"
                    onClick={() => showToast("Custom button clicked")}
                  >
                    Custom
                  </Button>
                  <span className="text-sm text-gray-500">Custom</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <h2 className="text-2xl font-semibold">Toast Notifications</h2>
          <Card>
            <CardHeader>
              <CardTitle>Toast Examples</CardTitle>
              <CardDescription>Different toast notification examples</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => 
                    toast({
                      title: "Success",
                      description: "Operation completed successfully!",
                    })
                  }
                >
                  Success Toast
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => 
                    toast({
                      title: "Information",
                      description: "Here's some information for you.",
                    })
                  }
                >
                  Info Toast
                </Button>
                
                <Button 
                  variant="secondary"
                  onClick={() => 
                    toast({
                      title: "Warning",
                      description: "Please be careful with this action.",
                      variant: "destructive",
                    })
                  }
                >
                  Warning Toast
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={() => 
                    toast({
                      title: "Error",
                      description: "Something went wrong. Please try again.",
                      variant: "destructive",
                    })
                  }
                >
                  Error Toast
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UIComponentsPage;




