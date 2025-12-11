'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const users = [
  { id: 1, name: 'María García', email: 'maria@escuela.com', role: 'Estudiante', grade: '5to A', status: 'active', avatar: 'MG' },
  { id: 2, name: 'Carlos López', email: 'carlos@escuela.com', role: 'Profesor', department: 'Matemáticas', status: 'active', avatar: 'CL' },
  { id: 3, name: 'Ana Martínez', email: 'ana@escuela.com', role: 'Estudiante', grade: '6to B', status: 'active', avatar: 'AM' },
  { id: 4, name: 'José Rodríguez', email: 'jose@escuela.com', role: 'Padre', children: '2 hijos', status: 'active', avatar: 'JR' },
  { id: 5, name: 'Laura Méndez', email: 'laura@escuela.com', role: 'Profesor', department: 'Ciencias', status: 'inactive', avatar: 'LM' },
  { id: 6, name: 'Pedro Sánchez', email: 'pedro@escuela.com', role: 'Estudiante', grade: '4to A', status: 'active', avatar: 'PS' },
  { id: 7, name: 'Carmen Flores', email: 'carmen@escuela.com', role: 'Administrativo', department: 'Secretaría', status: 'active', avatar: 'CF' },
  { id: 8, name: 'Roberto Díaz', email: 'roberto@escuela.com', role: 'Padre', children: '1 hijo', status: 'active', avatar: 'RD' },
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

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground mt-1">Administra todos los usuarios del sistema</p>
        </div>
        <Button>
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
            <div className="flex gap-2">
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
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </span>
                    <span>{user.role}</span>
                    <span>{user.grade || user.department || user.children}</span>
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
    </div>
  )
}
