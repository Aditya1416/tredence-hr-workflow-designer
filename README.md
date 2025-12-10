HR Workflow Designer – Drag & Drop Workflow Automation Tool
Assignment Submission – Tredence

Developed by: Aditya Sharma
Email: aditya161499@gmail.com
Student: SRM Institute of Science and Technlogy, Kattankulanthur, Chennai
Registration Number: RA2211026010295

Location: India

📌 Overview

This project demonstrates a workflow automation designer where HR teams can visually create onboarding, approval, and automated processes.
It includes drag-and-drop design, configuration panels, dynamic forms, simulation execution and JSON export.

Built to reflect real enterprise product design standards.

🚀 Features
Workflow Canvas

Drag nodes onto canvas

Connect via edges

Delete nodes & paths

Zoom + Pan

Real-time update on metadata and titles

Supported Node Types
Icon	Node Type	Purpose
🟢	Start	Entry point
🔵	Task	Manual HR tasks
🟡	Approval	Role-based authorization
🟣	Automated	System-triggered operations
🔴	End	Finish workflow
🧩 Node Configuration (Dynamic Forms)
Node	Editable Fields
Start	Title, metadata key/value
Task	Title, description, assignee, due date, custom metadata
Approval	Title, approver role, auto-approval threshold
Automated	Select action, dynamic param fields
End	End message & summary flag

Forms are dynamically rendered based on the selected node.

🧠 Mock API Layer
Endpoint	Function
/automations	Returns available automated actions
/simulate	Executes workflow and returns logs

This simulates backend orchestration logic for demonstration.

🧪 Workflow Simulation Panel

Validates workflow structure

Executes nodes in logical Start → End order

Generates real-time execution logs

Supports Export JSON for backend usage

Example Output:

Step 1 – Executed Start
Step 2 – Executed Task: Collect Documents
Step 3 – Executed Approval: Manager Review
...
Workflow Completed (ok)

🧱 Tech Stack
Category	Tools
Frontend	React, TypeScript
Canvas	React Flow
State	Context + Controlled Forms
Validation	Zod
Build Tool	Vite
UI	Custom CSS

📁 Project Structure
src/
│
├── apis/                   # Mock API logic (/simulate, /automations)
│   └── mockApi.ts
│
├── components/
│   ├── common/             # Shared small reusable UI parts
│   ├── workflow/           # Canvas, Nodes, Drag+drop logic
│   ├── forms/              # Node configuration forms
│   └── panels/             # Right panel (Config + Simulator)
│
├── context/                # Global management for workflow state
│
├── types/                  # TS interfaces: Node, Config, Simulation types
│
└── utils/                  # Graph traversal + validation engine


How to Run the Project (Step-by-Step)
Prerequisites

Ensure you have installed:

Node.js (v18+ recommended)

npm (comes with Node)

Git

Clone the repository
git clone https://github.com/Aditya1416/tredence-hr-workflow-designer.git

cd tredence-hr-workflow-designer

Install Dependencies
npm install

Start the Development Server
npm run dev


When the server boots, the terminal will show a URL similar to:

http://localhost:5173/


Go to the displayed URL (port may change depending on your machine).

Build for Production
npm run build

Preview Production Build
npm run preview

📦 Export & Integration

Export JSON structure for backend processing

Ready for integration with workflow automation engines

Future ready for AI-generated steps or suggestions

🌟 Why This Fits Tredence Expectations
Skill	Demonstrated
UI Engineering	Dynamic form systems
Architecture	Modular, scalable structure
Problem Solving	Graph traversal + validation
Product Thinking	Config, simulation, export
Integration Mindset	API-friendly JSON output

👨‍💻 Developer

Aditya Sharma
Frontend + AI/ML Enthusiast
Email: aditya161499@gmail.com

GitHub: https://github.com/Aditya1416
