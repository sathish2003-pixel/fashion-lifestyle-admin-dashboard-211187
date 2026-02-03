import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { 
  getEmployees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee,
  getEmployeeRoles,
  getEmployeeDepartments
} from '../services/mockData';
import { Users, Plus, X, Edit2, Trash2, Mail, Phone } from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Employees page component for managing team members with role-based access
 * @returns {JSX.Element} Employees page
 */
function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [roles] = useState(getEmployeeRoles());
  const [departments] = useState(getEmployeeDepartments());

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || employee.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  // Get role badge styling
  const getRoleBadge = (role) => {
    const badges = {
      Admin: 'text-purple-600 bg-purple-100',
      Manager: 'text-blue-600 bg-blue-100',
      Sales: 'text-success bg-green-100',
      Support: 'text-yellow-600 bg-yellow-100',
    };
    return badges[role] || 'text-gray-600 bg-gray-100';
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.role) {
      errors.role = 'Role is required';
    }
    
    if (!formData.department) {
      errors.department = 'Department is required';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle add employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    addEmployee(formData);
    setEmployees(getEmployees());
    handleCloseModal();
  };

  // Handle edit employee
  const handleEditEmployee = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    updateEmployee(selectedEmployee.id, formData);
    setEmployees(getEmployees());
    handleCloseEditModal();
  };

  // Handle delete employee
  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
      setEmployees(getEmployees());
    }
  };

  // Open edit modal
  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      phone: employee.phone
    });
    setShowEditModal(true);
  };

  // Close modals
  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      phone: ''
    });
    setFormErrors({});
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedEmployee(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      phone: ''
    });
    setFormErrors({});
  };

  // Get role statistics
  const roleStats = roles.map(role => ({
    role,
    count: employees.filter(emp => emp.role === role).length
  }));

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-100 rounded-full">
                <Users size={32} className="text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">{employees.length}</p>
            <p className="text-sm text-secondary mt-1">Total Employees</p>
          </div>
        </Card>
        {roleStats.map(stat => (
          <Card key={stat.role}>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.count}</p>
              <p className={`text-sm font-medium mt-1 ${getRoleBadge(stat.role)}`}>
                {stat.role}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[250px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Employee
          </button>
        </div>
      </Card>

      {/* Employees Table */}
      <Card title={`Employees (${filteredEmployees.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Role</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Join Date</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{employee.id}</td>
                  <td className="py-3 px-4 text-sm font-medium">{employee.name}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <Mail size={14} className="mr-2 text-secondary" />
                      {employee.email}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <Phone size={14} className="mr-2 text-secondary" />
                      {employee.phone}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(employee.role)}`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{employee.department}</td>
                  <td className="py-3 px-4 text-sm">{employee.joinDate}</td>
                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={() => openEditModal(employee)}
                      className="text-primary hover:text-gray-600 mr-3" 
                      aria-label="Edit employee"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-error hover:text-red-600" 
                      aria-label="Delete employee"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Add New Employee</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.name ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="e.g., John Anderson"
                  />
                  {formErrors.name && (
                    <p className="text-error text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.email ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="e.g., john@fashionadmin.com"
                  />
                  {formErrors.email && (
                    <p className="text-error text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.phone ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="e.g., +1-555-0101"
                  />
                  {formErrors.phone && (
                    <p className="text-error text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-primary mb-2">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.role ? 'border-error' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {formErrors.role && (
                    <p className="text-error text-sm mt-1">{formErrors.role}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-primary mb-2">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.department ? 'border-error' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {formErrors.department && (
                    <p className="text-error text-sm mt-1">{formErrors.department}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Edit Employee</h2>
                <button
                  onClick={handleCloseEditModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleEditEmployee} className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.name ? 'border-error' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-error text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="edit-email" className="block text-sm font-medium text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="edit-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.email ? 'border-error' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-error text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="edit-phone" className="block text-sm font-medium text-primary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="edit-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.phone ? 'border-error' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-error text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="edit-role" className="block text-sm font-medium text-primary mb-2">
                    Role *
                  </label>
                  <select
                    id="edit-role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.role ? 'border-error' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {formErrors.role && (
                    <p className="text-error text-sm mt-1">{formErrors.role}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="edit-department" className="block text-sm font-medium text-primary mb-2">
                    Department *
                  </label>
                  <select
                    id="edit-department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.department ? 'border-error' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {formErrors.department && (
                    <p className="text-error text-sm mt-1">{formErrors.department}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
