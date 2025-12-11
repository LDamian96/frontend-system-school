'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  X,
  Save,
  GraduationCap,
  BookOpen
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface GradeSection {
  id: string
  grade: string
  section: string
}

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  gradeSection?: string
  gradeSections?: string[]
  subjects?: string[]
  department?: string
  children?: string
  status: 'active' | 'inactive'
  avatar: string
}

const initialUsers: User[] = [
  { id: 1, name: 'María García', email: 'maria@escuela.com', phone: '999-111-222', role: 'Estudiante', gradeSection: '5to A', status: 'active', avatar: 'MG' },
  { id: 2, name: 'Carlos López', email: 'carlos@escuela.com', phone: '999-222-333', role: 'Profesor', gradeSections: ['5to A', '5to B', '6to A'], subjects: ['Matemáticas', 'Álgebra'], status: 'active', avatar: 'CL' },
  { id: 3, name: 'Ana Martínez', email: 'ana@escuela.com', phone: '999-333-444', role: 'Estudiante', gradeSection: '6to B', status: 'active', avatar: 'AM' },
  { id: 4, name: 'José Rodríguez', email: 'jose@escuela.com', phone: '999-444-555', role: 'Padre', children: '2 hijos', status: 'active', avatar: 'JR' },
  { id: 5, name: 'Laura Méndez', email: 'laura@escuela.com', phone: '999-555-666', role: 'Profesor', gradeSections: ['3ro A', '3ro B'], subjects: ['Ciencias'], status: 'inactive', avatar: 'LM' },
  { id: 6, name: 'Pedro Sánchez', email: 'pedro@escuela.com', phone: '999-666-777', role: 'Estudiante', gradeSection: '4to A', status: 'active', avatar: 'PS' },
  { id: 7, name: 'Carmen Flores', email: 'carmen@escuela.com', phone: '999-777-888', role: 'Administrativo', department: 'Secretaría', status: 'active', avatar: 'CF' },
  { id: 8, name: 'Roberto Díaz', email: 'roberto@escuela.com', phone: '999-888-999', role: 'Padre', children: '1 hijo', status: 'active', avatar: 'RD' },
]

const availableGradeSections = [
  '1ro A', '1ro B', '1ro C',
  '2do A', '2do B',
  '3ro A', '3ro B', '3ro C',
  '4to A', '4to B',
  '5to A', '5to B', '5to C',
  '6to A', '6to B',
]

const availableSubjects = [
  'Matemáticas',
  'Comunicación',
  'Ciencias',
  'Historia',
  'Geografía',
  'Inglés',
  'Educación Física',
  'Arte',
  'Computación',
  'Álgebra',
  'Geometría',
  'Física',
  'Química',
  'Biología',
]

const stats = [
  { label: 'Total Usuarios', value: '1,847', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { label: 'Activos', value: '1,723', icon: UserCheck, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { label: 'Inactivos', value: '124', icon: UserX, color: 'text-red-500', bgColor: 'bg-red-500/10' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface NewUser {
  name: string
  email: string
  phone: string
  role: string
  gradeSection: string
  gradeSections: string[]
  subjects: string[]
  department: string
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    phone: '',
    role: 'Estudiante',
    gradeSection: '',
    gradeSections: [],
    subjects: [],
    department: ''
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const toggleGradeSection = (gs: string) => {
    setNewUser(prev => ({
      ...prev,
      gradeSections: prev.gradeSections.includes(gs)
        ? prev.gradeSections.filter(g => g !== gs)
        : [...prev.gradeSections, gs]
    }))
  }

  const toggleSubject = (subject: string) => {
    setNewUser(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return

    const user: User = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: 'active',
      avatar: newUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    }

    if (newUser.role === 'Estudiante') {
      user.gradeSection = newUser.gradeSection
    } else if (newUser.role === 'Profesor') {
      user.gradeSections = newUser.gradeSections
      user.subjects = newUser.subjects
    } else if (newUser.role === 'Administrativo') {
      user.department = newUser.department
    }

    setUsers([user, ...users])
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'Estudiante',
      gradeSection: '',
      gradeSections: [],
      subjects: [],
      department: ''
    })
    setShowModal(false)
  }

  const getSecondaryInfo = (user: User) => {
    if (user.gradeSection) return user.gradeSection
    if (user.gradeSections && user.gradeSections.length > 0) {
      return user.gradeSections.length > 2
        ? `${user.gradeSections.slice(0, 2).join(', ')} +${user.gradeSections.length - 2}`
        : user.gradeSections.join(', ')
    }
    if (user.department) return user.department
    if (user.children) return user.children
    return ''
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground mt-1">Administra todos los usuarios del sistema</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'Estudiante', 'Profesor', 'Padre', 'Administrativo'].map((role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRole(role)}
                >
                  {role === 'all' ? 'Todos' : role}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.name}</p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-red-500/20 text-red-600'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                      {user.role}
                    </span>
                    {getSecondaryInfo(user) && (
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {getSecondaryInfo(user)}
                      </span>
                    )}
                    {user.subjects && user.subjects.length > 0 && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {user.subjects.length > 2
                          ? `${user.subjects.slice(0, 2).join(', ')} +${user.subjects.length - 2}`
                          : user.subjects.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Crear Nuevo Usuario</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                    <Input
                      placeholder="Ej: Juan Pérez"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="Ej: juan@escuela.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono</label>
                    <Input
                      placeholder="Ej: 999-123-456"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rol *</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({
                        ...newUser,
                        role: e.target.value,
                        gradeSection: '',
                        gradeSections: [],
                        subjects: [],
                        department: ''
                      })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="Estudiante">Estudiante</option>
                      <option value="Profesor">Profesor</option>
                      <option value="Padre">Padre de Familia</option>
                      <option value="Administrativo">Administrativo</option>
                    </select>
                  </div>
                </div>

                {/* Student - Single Grade/Section */}
                {newUser.role === 'Estudiante' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <GraduationCap className="h-4 w-4 inline mr-2" />
                      Grado y Sección *
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Un estudiante solo puede pertenecer a un grado y sección
                    </p>
                    <select
                      value={newUser.gradeSection}
                      onChange={(e) => setNewUser({ ...newUser, gradeSection: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">Seleccionar grado y sección</option>
                      {availableGradeSections.map(gs => (
                        <option key={gs} value={gs}>{gs}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Teacher - Multiple Grades/Sections */}
                {newUser.role === 'Profesor' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <GraduationCap className="h-4 w-4 inline mr-2" />
                        Grados y Secciones *
                      </label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Un profesor puede pertenecer a múltiples grados y secciones. Haz clic para seleccionar.
                      </p>
                      <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30 max-h-40 overflow-y-auto">
                        {availableGradeSections.map(gs => (
                          <button
                            key={gs}
                            type="button"
                            onClick={() => toggleGradeSection(gs)}
                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                              newUser.gradeSections.includes(gs)
                                ? 'bg-primary text-white border-primary'
                                : 'bg-background hover:bg-muted'
                            }`}
                          >
                            {gs}
                          </button>
                        ))}
                      </div>
                      {newUser.gradeSections.length > 0 && (
                        <p className="text-sm text-primary mt-2">
                          Seleccionados: {newUser.gradeSections.join(', ')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <BookOpen className="h-4 w-4 inline mr-2" />
                        Materias *
                      </label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Selecciona las materias que enseña el profesor
                      </p>
                      <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30 max-h-40 overflow-y-auto">
                        {availableSubjects.map(subject => (
                          <button
                            key={subject}
                            type="button"
                            onClick={() => toggleSubject(subject)}
                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                              newUser.subjects.includes(subject)
                                ? 'bg-green-500 text-white border-green-500'
                                : 'bg-background hover:bg-muted'
                            }`}
                          >
                            {subject}
                          </button>
                        ))}
                      </div>
                      {newUser.subjects.length > 0 && (
                        <p className="text-sm text-green-600 mt-2">
                          Seleccionadas: {newUser.subjects.join(', ')}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Administrative - Department */}
                {newUser.role === 'Administrativo' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Departamento</label>
                    <select
                      value={newUser.department}
                      onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">Seleccionar departamento</option>
                      <option value="Secretaría">Secretaría</option>
                      <option value="Dirección">Dirección</option>
                      <option value="Contabilidad">Contabilidad</option>
                      <option value="Biblioteca">Biblioteca</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateUser}>
                  <Save className="h-4 w-4 mr-2" />
                  Crear Usuario
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
