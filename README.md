HR Workflow Designer – Drag & Drop Workflow Automation Tool

Assignment Submission – Tredence

Developed by Aditya Sharma
Email: aditya161499@gmail.com

Location: India

🧩 Project Summary

This project implements a visual workflow orchestration system built using React, TypeScript, and React Flow.
The objective is to allow HR and operational stakeholders to design onboarding or approval pipelines through an intuitive drag-and-drop interface, configure each step, validate structure, and simulate execution.

This solution demonstrates:

UI architecture thinking

React performance state management patterns

Workflow graph visualization

Dynamic form rendering

Mock API simulation

Practical product mindset

Designed for scalability, extendability, and production-oriented modularity.

🎯 Business Use Case

HR teams typically depend on static documents and email trails for onboarding, approvals, or request routing.
This project showcases how Tredence-style analytical and process-automation product development could standardize such workflows with:

Repeatability

Visibility

Configurability

Structured backend execution

🚀 Feature Overview
Feature	Description
Drag & Drop Workflow Canvas	Create sequential workflows visually
Multiple Node Types	Start, Task, Approver, Automated Step, End
Dynamic Configuration Panels	Form adjusts based on node type
Mock API Layer	Simulates automated actions and workflow execution
Real-Time Execution Log	Visual simulation based on graph traversal
Export JSON	Ready for backend ingestion
Clean Extensible Architecture	Add new node types easily
🧱 Node Types and Their Configuration
Node Type	Editable Fields
Start	Title, metadata key/value
Task	Title, description, assignee, due date, custom key/value
Approval	Title, approver role, auto-threshold
Automated	Title, action selection, dynamic parameter inputs
End	Message, summary boolean
🖥️ Technology Stack
Category	Tools
Frontend	React, TypeScript
Workflow Canvas	React Flow
Forms	Controlled React Forms
Mock API	Local layer simulating /automations & /simulate
Styling	Custom CSS / Inline UI elements
Build Tool	Vite
📁 Project Architecture
src/
 ├── apis/                     # mock API Layer
 ├── components/
 │   ├── workflow/             # canvas + drag logic
 │   ├── panels/               # config + simulation panels
 │   ├── forms/                # forms per node type
 ├── context/                  # global state for nodes + edges
 ├── types/                    # workflow domain types
 └── utils/                    # graph traversal, validation


This structure cleanly separates canvas logic, state, forms, and API, aligning with enterprise-scale expectations.

🧪 How to Run Locally
npm install
npm run dev


Open in browser:
http://localhost:5173/

🧰 Testing & Simulation Panel

Validates workflow structure

Displays execution logs in Start→End sequence

Mocks real backend orchestration engines

Exports JSON for potential workflow engines


📌 Why This Solution Aligns with Tredence Expectations
Capability	Demonstrated
System thinking	Modular scalable architecture
Front-end engineering	Dynamic UI + form control
Product mindset	Exportability + simulation
Data thinking	Normalized configurable structure
Practical delivery	Fully functional assignment

This prototype reflects real-world utility, not just UI demonstration.
Aditya Sharma
Aspiring AI + Software Engineer
Focus Areas: Full Stack Development, AI Systems, Applied ML
Email: aditya161499@gmail.com
SRM Institute of Science and Technology, Kattankulanthur, Chennai
Reg No: RA2211026010295

GitHub: https://github.com/Aditya1416/tredence-hr-workflow-designer.git
