'use client';

import {useState} from 'react';
import {ArrowRight,Check,FileText,GraduationCap,MoreHorizontal,Upload,X} from 'lucide-react';
import {Area,AreaChart,CartesianGrid,XAxis} from 'recharts';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {SectionHeading} from '@/components/section-heading';
import {Attachment,AttachmentAction,AttachmentActions,AttachmentContent,AttachmentDescription,AttachmentMedia,AttachmentTitle,AttachmentUpload,Avatar,AvatarFallback,Button,ButtonGroup,ButtonGroupText,Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,Checkbox,DatePicker,Calendar,DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,Drawer,DrawerClose,DrawerContent,DrawerDescription,DrawerFooter,DrawerHeader,DrawerTitle,DrawerTrigger,Empty,EmptyContent,EmptyDescription,EmptyHeader,EmptyMedia,EmptyTitle,Field,FieldContent,FieldDescription,FieldGroup,FieldTitle,Pagination,PaginationContent,PaginationEllipsis,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,Progress,Skeleton,Spinner,Switch,Table,TableBody,TableCell,TableHead,TableHeader,TableRow,Tabs,TabsContent,TabsList,TabsTrigger,Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,ChartContainer,ChartTooltip,ChartTooltipContent,Collapsible,CollapsibleContent,CollapsibleTrigger,CommandDialog,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,ContextMenu,ContextMenuContent,ContextMenuItem,ContextMenuTrigger,Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,HoverCard,HoverCardContent,HoverCardTrigger,Menubar,MenubarContent,MenubarItem,MenubarMenu,MenubarSeparator,MenubarTrigger,NavigationMenu,NavigationMenuContent,NavigationMenuItem,NavigationMenuLink,NavigationMenuList,NavigationMenuTrigger,Popover,PopoverContent,PopoverTrigger,Questionnaire,QuestionnaireActions,QuestionnaireChoice,QuestionnaireChoices,QuestionnaireItem,QuestionnaireNext,QuestionnairePrevious,QuestionnaireSubmit,QuestionnaireTitle,RadioGroup,RadioGroupItem,Sidebar,SidebarContent,SidebarFooter,SidebarGroup,SidebarGroupLabel,SidebarHeader,SidebarInset,SidebarMenu,SidebarMenuButton,SidebarMenuItem,SidebarProvider,SidebarTrigger,Slider,ImageCard} from '@/components/ui';

const chartData=[{month:'Jan',desktop:18,mobile:10},{month:'Feb',desktop:24,mobile:14},{month:'Mar',desktop:21,mobile:17},{month:'Apr',desktop:30,mobile:20},{month:'May',desktop:27,mobile:22}];
const demoImage='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22360%22 viewBox=%220 0 600 360%22%3E%3Crect width=%22600%22 height=%22360%22 fill=%22%23E2EEFC%22/%3E%3Cpath d=%22M0 280 150 170 280 260 410 110 600 250V360H0Z%22 fill=%22%235294FF%22/%3E%3Ccircle cx=%22460%22 cy=%2290%22 r=%2244%22 fill=%22%23FF4D50%22/%3E%3Ctext x=%2230%22 y=%22320%22 fill=%22%23000000%22 font-size=%2224%22 font-family=%22Arial%22%3ECampusPulse media preview%3C/text%3E%3C/svg%3E';

export default function ComponentLibraryPage(){
 const [files,setFiles]=useState<File[]>([]);
 const [date,setDate]=useState('');
 const [checked,setChecked]=useState(true);
 const [enabled,setEnabled]=useState(true);
 const [radio,setRadio]=useState('merit');
 const [range,setRange]=useState([42]);
 const [cmdOpen,setCmdOpen]=useState(false);
 const [question,setQuestion]=useState('role');
 const [questionSubmitted,setQuestionSubmitted]=useState(false);
 const form=useForm({resolver:zodResolver(z.object({studentName:z.string().min(2,'Enter at least two characters.')})),defaultValues:{studentName:''}});

 return <div className="component-library-page">
  <SectionHeading eyebrow="DESIGN SYSTEM / INTERACTIVE PREVIEW" title="CampusPulse UI components." description="A live component gallery for the Neobrutalism.dev Blue-inspired interface. These reusable components are also connected to the document-review, planner and profile workflows."/>
  <div className="component-library-notice"><GraduationCap size={17}/><span>Pale-blue canvas · white surfaces · black outlines · vivid blue actions · DM Sans typography · tactile offset shadows.</span></div>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">01 / BUTTONS & ACTIONS</span><h2>Tactile button variants</h2></div>
   <div className="component-demo-panel">
    <div className="component-demo-row"><Button>Default action <ArrowRight size={14}/></Button><Button variant="primary">Primary <Check size={14}/></Button><Button variant="secondary">Secondary <GraduationCap size={14}/></Button><Button variant="neutral">Neutral</Button><Button variant="outline">Outline</Button><Button variant="destructive">Destructive</Button></div>
    <div className="component-demo-row"><Button size="xs">Extra small</Button><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button><Button size="icon" aria-label="More options"><MoreHorizontal size={17}/></Button></div>
    <ButtonGroup><Button variant="neutral">Archive</Button><Button variant="neutral">Report</Button><Button variant="neutral">Snooze</Button><ButtonGroupText>3 actions</ButtonGroupText></ButtonGroup>
   </div>
  </section>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">02 / ATTACHMENTS</span><h2>File states and dropzone</h2></div>
   <div className="component-demo-grid two">
    <div className="component-demo-panel"><Attachment><AttachmentMedia><FileText/></AttachmentMedia><AttachmentContent><AttachmentTitle>scholarship-certificate.pdf</AttachmentTitle><AttachmentDescription>PDF · 2.4 MB · Ready to review</AttachmentDescription></AttachmentContent><AttachmentActions><AttachmentAction aria-label="Remove sample"><X size={15}/></AttachmentAction></AttachmentActions></Attachment></div>
    <div className="component-demo-panel"><Attachment state="uploading"><AttachmentMedia/><AttachmentContent><AttachmentTitle>income-certificate.pdf</AttachmentTitle><AttachmentDescription>Uploading · 45%</AttachmentDescription></AttachmentContent><AttachmentActions><Spinner/></AttachmentActions></Attachment></div>
    <div className="component-demo-panel"><Attachment state="error"><AttachmentMedia/><AttachmentContent><AttachmentTitle>large-file.pdf</AttachmentTitle><AttachmentDescription>File is too large</AttachmentDescription></AttachmentContent><AttachmentActions><X size={15}/></AttachmentActions></Attachment></div>
    <div className="component-demo-panel"><Attachment state="done"><AttachmentMedia/><AttachmentContent><AttachmentTitle>marksheet.pdf</AttachmentTitle><AttachmentDescription>PDF · 1.2 MB · Review complete</AttachmentDescription></AttachmentContent></Attachment></div>
    <div className="component-demo-panel component-demo-span"><AttachmentUpload onFiles={setFiles}/>{files.map((file,index)=><Attachment key={file.name+index}><AttachmentMedia/><AttachmentContent><AttachmentTitle>{file.name}</AttachmentTitle><AttachmentDescription>{(file.size/1024/1024).toFixed(2)} MB</AttachmentDescription></AttachmentContent></Attachment>)}</div>
   </div>
  </section>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">03 / IDENTITY & CARDS</span><h2>Avatars, cards and media</h2></div>
   <div className="component-demo-grid two">
    <div className="component-demo-panel"><div className="component-demo-row"><Avatar><AvatarFallback>MI</AvatarFallback></Avatar><Avatar className="cp-avatar-blue"><AvatarFallback>DS</AvatarFallback></Avatar><Avatar className="cp-avatar-coral"><AvatarFallback>ST</AvatarFallback></Avatar></div></div>
    <Card><CardHeader><CardTitle>Scholarship readiness</CardTitle><CardDescription>Reusable card structure with the CampusPulse token system.</CardDescription></CardHeader><CardContent><p>Keep related information together, with clear hierarchy and spacing.</p></CardContent><CardFooter><Button size="sm">Open details <ArrowRight size={13}/></Button></CardFooter></Card>
    <div className="component-demo-panel"><ImageCard imageUrl={demoImage} alt="Abstract CampusPulse colour illustration" caption="Local SVG media preview"/></div>
   </div>
  </section>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">04 / INPUTS & CONTROLS</span><h2>Checkboxes, switches, radio and sliders</h2></div>
   <div className="component-demo-grid two">
    <div className="component-demo-panel"><FieldGroup><Field orientation="horizontal"><Checkbox checked={checked} onChange={e=>setChecked(e.target.checked)}/><FieldContent><FieldTitle>Remember this preference</FieldTitle><FieldDescription>Saved only for this preview.</FieldDescription></FieldContent></Field><Field orientation="horizontal"><Switch checked={enabled} onChange={e=>setEnabled(e.target.checked)}/><FieldContent><FieldTitle>Enable reminders</FieldTitle><FieldDescription>Switches use the same reference blue action colour.</FieldDescription></FieldContent></Field></FieldGroup></div>
    <div className="component-demo-panel"><RadioGroup value={radio} onValueChange={setRadio}><Field orientation="horizontal"><RadioGroupItem id="radio-merit" value="merit"/><FieldContent><FieldTitle>Merit-based</FieldTitle><FieldDescription>Academic criteria apply.</FieldDescription></FieldContent></Field><Field orientation="horizontal"><RadioGroupItem id="radio-need" value="need"/><FieldContent><FieldTitle>Need-based</FieldTitle><FieldDescription>Financial criteria apply.</FieldDescription></FieldContent></Field></RadioGroup><p className="component-demo-hint">Selected: {radio}</p><label className="field"><span>Sample range: {range[0]}</span><Slider value={range} onValueChange={setRange} min={0} max={100} step={1}/></label></div>
    <div className="component-demo-panel"><label className="field"><span>Choose a date</span><DatePicker value={date} onChange={setDate} placeholder="Select a date"/></label><p className="component-demo-hint">{date?'Selected: '+date:'No date selected yet.'}</p><Calendar onSelect={d=>d&&setDate([d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-'))}/></div>
   </div>
  </section>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">05 / MENUS, DIALOGS & DRAWERS</span><h2>Layered interactions</h2></div>
   <div className="component-demo-panel component-demo-row">
    <DropdownMenu><DropdownMenuTrigger>Workspace tools <MoreHorizontal size={15}/></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>WORKSPACE</DropdownMenuLabel><DropdownMenuItem>Saved scholarships</DropdownMenuItem><DropdownMenuItem>Personal planner</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem>Profile settings</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
    <Dialog><DialogTrigger className="cp-ui-button cp-ui-button-secondary">Open dialog</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Confirm your action</DialogTitle><DialogDescription>This is the reusable dialog component, styled for CampusPulse.</DialogDescription></DialogHeader><p>Use this pattern for confirmations and focused workflows.</p><DialogFooter><DialogClose className="cp-ui-button cp-ui-button-neutral">Cancel</DialogClose><DialogClose className="cp-ui-button cp-ui-button-primary">Continue</DialogClose></DialogFooter></DialogContent></Dialog>
    <Drawer><DrawerTrigger className="cp-ui-button cp-ui-button-neutral">Open mobile drawer</DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Quick actions</DrawerTitle><DrawerDescription>Drawer layout for narrow-screen flows.</DrawerDescription></DrawerHeader><div className="component-demo-stack"><Button>Check eligibility</Button><Button variant="secondary">Browse scholarships</Button></div><DrawerFooter><DrawerClose className="cp-ui-button cp-ui-button-neutral">Close drawer</DrawerClose></DrawerFooter></DrawerContent></Drawer>
    <Popover><PopoverTrigger>Open quick details</PopoverTrigger><PopoverContent>A small anchored panel for contextual helper information.</PopoverContent></Popover>
    <HoverCard><HoverCardTrigger>Hover or focus for help</HoverCardTrigger><HoverCardContent>CampusPulse is an independent guide. Confirm final requirements and dates with official scheme sources.</HoverCardContent></HoverCard>
   </div>
  </section>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">06 / COMMAND & NAVIGATION</span><h2>Search, context menu and navigation menus</h2></div>
   <div className="component-demo-panel component-demo-row">
    <Button onClick={()=>setCmdOpen(true)}>Open command search</Button>
    <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}><CommandInput placeholder="Search CampusPulse actions…"/><CommandList><CommandEmpty>No matching action.</CommandEmpty><CommandGroup heading="Quick actions"><CommandItem value="scholarships" onSelect={()=>setCmdOpen(false)}>Browse scholarships</CommandItem><CommandItem value="eligibility" onSelect={()=>setCmdOpen(false)}>Check eligibility</CommandItem><CommandItem value="planner" onSelect={()=>setCmdOpen(false)}>Open planner</CommandItem></CommandGroup></CommandList></CommandDialog>
    <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>Export</MenubarItem><MenubarSeparator/><MenubarItem>Close</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarItem>Overview</MenubarItem><MenubarItem>Shortlist</MenubarItem></MenubarContent></MenubarMenu></Menubar>
    <NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Resources</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="/scholarships">Scholarship directory</NavigationMenuLink><NavigationMenuLink href="/services">Student services</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>
   </div>
   <div className="component-demo-panel"><ContextMenu><ContextMenuTrigger>Right-click inside this panel to open a context menu</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Open details</ContextMenuItem><ContextMenuItem>Copy reference</ContextMenuItem></ContextMenuContent></ContextMenu></div>
  </section>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">07 / DISCLOSURE & CAROUSEL</span><h2>Collapsible content and horizontal cards</h2></div>
   <div className="component-demo-grid two">
    <div className="component-demo-panel"><Collapsible defaultOpen><CollapsibleTrigger>Application details <span>⌄</span></CollapsibleTrigger><CollapsibleContent>Scheme details, official conditions and required documents can be disclosed progressively without hiding the page structure.</CollapsibleContent></Collapsible></div>
    <div className="component-demo-panel"><Carousel><CarouselContent><CarouselItem><Card><CardHeader><CardTitle>Discover</CardTitle><CardDescription>Find schemes and student services.</CardDescription></CardHeader></Card></CarouselItem><CarouselItem><Card><CardHeader><CardTitle>Check</CardTitle><CardDescription>Compare your details with published criteria.</CardDescription></CardHeader></Card></CarouselItem><CarouselItem><Card><CardHeader><CardTitle>Prepare</CardTitle><CardDescription>Review documents and organise next steps.</CardDescription></CardHeader></Card></CarouselItem></CarouselContent><div className="component-demo-row"><CarouselPrevious/><CarouselNext/></div></Carousel></div>
   </div>
  </section>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">08 / TABLES, TABS & PAGINATION</span><h2>Structured information</h2></div>
   <div className="component-demo-panel"><Tabs defaultValue="schemes"><TabsList><TabsTrigger value="schemes">Schemes</TabsTrigger><TabsTrigger value="documents">Documents</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList><TabsContent value="schemes"><Table><TableHeader><TableRow><TableHead>Scheme</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Merit scholarship</TableCell><TableCell>Merit</TableCell><TableCell>Open</TableCell></TableRow><TableRow><TableCell>Post-matric support</TableCell><TableCell>Welfare</TableCell><TableCell>Verify details</TableCell></TableRow></TableBody></Table></TabsContent><TabsContent value="documents"><Empty><EmptyHeader><EmptyMedia><FileText/></EmptyMedia><EmptyTitle>No documents attached</EmptyTitle><EmptyDescription>Documents added in a real workflow appear here.</EmptyDescription></EmptyHeader><EmptyContent><Button size="sm"><Upload size={13}/> Add a document</Button></EmptyContent></Empty></TabsContent><TabsContent value="activity"><p>Recent activity is shown in this tab.</p></TabsContent></Tabs></div>
   <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#"/></PaginationItem><PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis/></PaginationItem><PaginationItem><PaginationNext href="#"/></PaginationItem></PaginationContent></Pagination>
  </section>

  <section className="component-demo-section">
   <div className="component-demo-heading"><span className="eyebrow">09 / FORMS, SIDEBAR & CHART</span><h2>Complex application patterns</h2></div>
   <div className="component-demo-grid two">
    <div className="component-demo-panel"><Form {...form}><form onSubmit={form.handleSubmit(()=>undefined)} className="component-demo-stack"><FormField control={form.control} name="studentName" render={({field})=><FormItem><FormLabel>Student name</FormLabel><FormControl><input {...field} placeholder="Enter a name"/></FormControl><FormDescription>React Hook Form + Zod example.</FormDescription><FormMessage/></FormItem>}/><Button type="submit">Validate input</Button></form></Form></div>
    <div className="component-demo-panel"><SidebarProvider><Sidebar><SidebarHeader><b>Workspace</b></SidebarHeader><SidebarTrigger/><SidebarContent><SidebarGroup><SidebarGroupLabel>STUDENT TOOLS</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton>Scholarships</SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton>Planner</SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroup></SidebarContent><SidebarFooter>CampusPulse</SidebarFooter></Sidebar><SidebarInset><p>Sidebar content area</p></SidebarInset></SidebarProvider></div>
    <div className="component-demo-panel component-demo-span"><span className="eyebrow">DEMO DATA ONLY — NOT SCHOLARSHIP STATISTICS</span><ChartContainer config={{desktop:{label:'Desktop',color:'#5294FF'},mobile:{label:'Mobile',color:'#FF4D50'}}} height={220}><AreaChart data={chartData}><CartesianGrid vertical={false}/><XAxis dataKey="month"/><Area dataKey="desktop" type="monotone" fill="var(--color-desktop)" stroke="var(--color-desktop)"/><Area dataKey="mobile" type="monotone" fill="var(--color-mobile)" stroke="var(--color-mobile)"/><ChartTooltip content={<ChartTooltipContent indicator="dot"/>}/></AreaChart></ChartContainer></div>
   </div>
   <div className="component-demo-panel"><Questionnaire items={[{name:'role',required:true,choices:[{value:'student'},{value:'graduate'}]},{name:'need',required:true,choices:[{value:'scholarship'},{value:'documents'}]}]} item={question} onItemChange={setQuestion} onSubmit={()=>setQuestionSubmitted(true)}><QuestionnaireItem name="role" required><QuestionnaireTitle>Which describes you?</QuestionnaireTitle><QuestionnaireChoices><QuestionnaireChoice value="student">Current student</QuestionnaireChoice><QuestionnaireChoice value="graduate">Graduate</QuestionnaireChoice></QuestionnaireChoices></QuestionnaireItem><QuestionnaireItem name="need" required><QuestionnaireTitle>What do you need help with?</QuestionnaireTitle><QuestionnaireChoices><QuestionnaireChoice value="scholarship">Scholarships</QuestionnaireChoice><QuestionnaireChoice value="documents">Documents</QuestionnaireChoice></QuestionnaireChoices></QuestionnaireItem><QuestionnaireActions><QuestionnairePrevious/><QuestionnaireNext/><QuestionnaireSubmit/></QuestionnaireActions></Questionnaire>{questionSubmitted&&<p>Sample questionnaire submitted.</p>}</div>
  </section>

  <div className="component-demo-panel component-demo-row"><span className="eyebrow">LOADING STATES</span><Spinner/><Skeleton className="h-4 w-40"/><Progress value={68}/></div>
 </div>;
}
