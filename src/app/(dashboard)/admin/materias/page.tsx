'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Library,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Clock,
  X,
  Save,
  GraduationCap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Subject {
  id: number
  name: string
  code: string
  description: string
  hoursPerWeek: number
  credits: number
  teachers: { id: number; name: string; avatar: string }[]
  courses: string[]
  color: string
  status: 'active' | 'inactive'
}

const subjects: Subject[] = [
  { id: 1, name: 'Matemáticas', code: 'MAT-001', description: 'Álgebra, geometría y aritmética', hoursPerWeek: 6, credits: 4, teachers: [{ id: 1, name: 'Prof. López', avatar: 'PL' }, { id: 2, name: 'Prof. García', avatar: 'PG' }], courses: ['3ro A', '4to A', '5to A', '5to B'], color: 'bg-blue-500', status: 'active' },
  { id: 2, name: 'Español', code: 'ESP-001', description: 'Lengua y literatura', hoursPerWeek: 5, credits: 4, teachers: [{ id: 3, name: 'Prof. Martínez', avatar: 'PM' }], courses: ['3ro A', '3ro B', '4to A', '4to B'], color: 'bg-green-500', status: 'active' },
  { id: 3, name: 'Ciencias Naturales', code: 'CIE-001', description: 'Biología, física y química', hoursPerWeek: 4, credits: 3, teachers: [{ id: 4, name: 'Prof. Rodríguez', avatar: 'PR' }], courses: ['4to A', '5to A', '6to A'], color: 'bg-purple-500', status: 'active' },
  { id: 4, name: 'Historia', code: 'HIS-001', description: 'Historia universal y nacional', hoursPerWeek: 3, credits: 2, teachers: [{ id: 5, name: 'Prof. Sánchez', avatar: 'PS' }], courses: ['5to A', '5to B', '6to A'], color: 'bg-yellow-500', status: 'active' },
  { id: 5, name: 'Inglés', code: 'ING-001', description: 'Idioma extranjero', hoursPerWeek: 4, credits: 3, teachers: [{ id: 6, name: 'Prof. Williams', avatar: 'PW' }], courses: ['3ro A', '3ro B', '4to A', '4to B', '5to A'], color: 'bg-red-500', status: 'active' },
  { id: 6, name: 'Educación Física', code: 'EDF-001', description: 'Actividad física y deportes', hoursPerWeek: 2, credits: 1, teachers: [{ id: 7, name: 'Prof. Torres', avatar: 'PT' }], courses: ['3ro A', '3ro B', '4to A', '4to B', '5to A', '5to B'], color: 'bg-orange-500', status: 'active' },
  { id: 7, name: 'Arte', code: 'ART-001', description: 'Expresión artística y visual', hoursPerWeek: 2, credits: 1, teachers: [{ id: 8, name: 'Prof. Vargas', avatar: 'PV' }], courses: ['3ro A', '3ro B'], color: 'bg-pink-500', status: 'inactive' },
]

export default function AdminMateriasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    description: '',
    hoursPerWeek: '4',
    credits: '3'
  })

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: subjects.length,
    active: subjects.filter(s => s.status === 'active').length,
    totalHours: subjects.reduce((acc, s) => acc + s.hoursPerWeek, 0),
    totalTeachers: new Set(subjects.flatMap(s => s.teachers.map(t => t.id))).size
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Gestión de Materias</h1>
          <p className="text-muted-foreground mt-1">Administra las asignaturas del plan de estudios</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Materia
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Materias', value: stats.total, icon: Library, color: 'text-primary', bgColor: 'bg-primary/10' },
          { label: 'Activas', value: stats.active, icon: BookOpen, color: 'text-green-500', bgColor: 'bg-green-500/10' },
          { label: 'Horas Semanales', value: stats.totalHours, icon: Clock, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
          { label: 'Profesores', value: stats.totalTeachers, icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
        ].map((stat, index) => (
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
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar materias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select className="h-10 px-3 rounded-md border border-input bg-background text-sm">
              <option value="">Todos los estados</option>
              <option value="active">Activas</option>
              <option value="inactive">Inactivas</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${subject.color}/20`}>
                    <Library className={`h-6 w-6 ${subject.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{subject.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subject.status === 'active' ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-600'
                      }`}>
                        {subject.status === 'active' ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{subject.code}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{subject.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Horas/Semana</p>
                    <p className="font-semibold">{subject.hoursPerWeek}h</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Créditos</p>
                    <p className="font-semibold">{subject.credits}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Profesores asignados</p>
                  <div className="flex -space-x-2">
                    {subject.teachers.map(teacher => (
                      <Avatar key={teacher.id} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {teacher.avatar}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Cursos ({subject.courses.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {subject.courses.slice(0, 3).map(course => (
                      <span key={course} className="px-2 py-1 text-xs rounded-full bg-muted">
                        {course}
                      </span>
                    ))}
                    {subject.courses.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-muted">
                        +{subject.courses.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl shadow-xl w-full max-w-lg"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-semibold">Nueva Materia</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre de la Materia</label>
                  <Input
                    placeholder="Ej: Matemáticas"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Código</label>
                  <Input
                    placeholder="Ej: MAT-001"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Descripción</label>
                  <textarea
                    className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                    placeholder="Descripción de la materia..."
                    value={newSubject.description}
                    onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Horas por Semana</label>
                    <Input
                      type="number"
                      value={newSubject.hoursPerWeek}
                      onChange={(e) => setNewSubject({ ...newSubject, hoursPerWeek: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Créditos</label>
                    <Input
                      type="number"
                      value={newSubject.credits}
                      onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowCreateModal(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  Crear Materia
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
