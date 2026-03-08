namespace $.$$ {

	export class $bog_ui_app_table extends $.$bog_ui_app_table {

		columns() {
			return [
				{ id: 'name', title: 'Name', sortable: true },
				{ id: 'email', title: 'Email', sortable: true },
				{ id: 'department', title: 'Department', sortable: true },
				{ id: 'role', title: 'Role', sortable: true },
				{ id: 'salary', title: 'Salary', sortable: true },
			]
		}

		data() {
			return [
				{ name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', role: 'Senior Developer', salary: 120000 },
				{ name: 'Bob Smith', email: 'bob@example.com', department: 'Design', role: 'UI Designer', salary: 95000 },
				{ name: 'Carol Williams', email: 'carol@example.com', department: 'Engineering', role: 'Tech Lead', salary: 145000 },
				{ name: 'David Brown', email: 'david@example.com', department: 'Marketing', role: 'Marketing Manager', salary: 105000 },
				{ name: 'Eva Martinez', email: 'eva@example.com', department: 'Engineering', role: 'Junior Developer', salary: 75000 },
				{ name: 'Frank Lee', email: 'frank@example.com', department: 'Sales', role: 'Sales Director', salary: 130000 },
				{ name: 'Grace Kim', email: 'grace@example.com', department: 'Design', role: 'UX Researcher', salary: 98000 },
				{ name: 'Henry Chen', email: 'henry@example.com', department: 'Engineering', role: 'DevOps Engineer', salary: 115000 },
				{ name: 'Iris Patel', email: 'iris@example.com', department: 'HR', role: 'HR Manager', salary: 100000 },
				{ name: 'Jack Wilson', email: 'jack@example.com', department: 'Engineering', role: 'Senior Developer', salary: 125000 },
				{ name: 'Karen Davis', email: 'karen@example.com', department: 'Finance', role: 'CFO', salary: 180000 },
				{ name: 'Leo Garcia', email: 'leo@example.com', department: 'Engineering', role: 'QA Engineer', salary: 90000 },
				{ name: 'Mia Thompson', email: 'mia@example.com', department: 'Marketing', role: 'Content Writer', salary: 72000 },
				{ name: 'Noah Robinson', email: 'noah@example.com', department: 'Engineering', role: 'Full Stack Developer', salary: 118000 },
				{ name: 'Olivia Clark', email: 'olivia@example.com', department: 'Design', role: 'Art Director', salary: 120000 },
				{ name: 'Peter Wright', email: 'peter@example.com', department: 'Sales', role: 'Account Manager', salary: 88000 },
				{ name: 'Quinn Adams', email: 'quinn@example.com', department: 'Engineering', role: 'Security Engineer', salary: 135000 },
				{ name: 'Rachel Scott', email: 'rachel@example.com', department: 'HR', role: 'Recruiter', salary: 78000 },
				{ name: 'Sam Turner', email: 'sam@example.com', department: 'Engineering', role: 'Backend Developer', salary: 112000 },
				{ name: 'Tina Morgan', email: 'tina@example.com', department: 'Finance', role: 'Financial Analyst', salary: 92000 },
				{ name: 'Uma Nguyen', email: 'uma@example.com', department: 'Engineering', role: 'ML Engineer', salary: 140000 },
				{ name: 'Victor Hall', email: 'victor@example.com', department: 'Marketing', role: 'SEO Specialist', salary: 82000 },
			]
		}

		@ $mol_mem
		selected_text() {
			const sel = this.selected()
			const count = sel.length
			if( count === 0 ) return 'No rows selected'
			return `${ count } row${ count > 1 ? 's' : '' } selected`
		}

	}

}
