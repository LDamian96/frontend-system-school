'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const tasks = [
  {
    id: 1,
    title: 'Ejercicios de Álgebra Cap. 5',
    course: '6to A - Álgebra',
    dueDate: '2024-12-15',
    created: '2024-12-10',
    submissions: 18,
    total: 30,
    status: 'active'
  },
  {
    id: 2,
    title: 'Problemas de Geometría',
    course: '6to B - Geometría',
    dueDate: '2024-12-14',
    created: '2024-12-08',
    submissions: 25,
    total: 31,
    status: 'active'
  },
  {
    id: 3,
    title: 'Examen Parcial Matemáticas',
    course: '5to A - Matemáticas',
    dueDate: '2024-12-12',
    created: '2024-12-05',
    submissions: 32,
    total: 32,
    status: 'grading'
  },
  {
    id: 4,
    title: 'Tarea de Fracciones',
    course: '5to B - Matemáticas',
    dueDate: '2024-12-10',
    created: '2024-12-03',
    submissions: 28,
    total: 28,
    status: 'completed'
  },
  {
    id: 5,
    title: 'Proyecto Final',
    course: '6to A - Álgebra',
    dueDate: '2024-12-20',
    created: '2024-12-01',
    submissions: 5,
    total: 30,
    status: 'active'
  },
]

const stats = [
  { label: 'Tareas Activas', value: '8', icon: FileText, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { label: 'Por Calificar', value: '23', icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  { label: 'Completadas', value: '45', icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
]

export default function TeacherTareasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-600">Activa</span>
      case 'grading':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-600">Por Calificar</span>
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-600">Completada</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Gestión de Tareas</h1>
          <p className="text-muted-foreground mt-1">Crea y administra las tareas de tus cursos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
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

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tareas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Todas' },
                { value: 'active', label: 'Activas' },
                { value: 'grading', label: 'Por Calificar' },
                { value: 'completed', label: 'Completadas' },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterStatus === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Tareas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{task.title}</p>
                    {getStatusBadge(task.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{task.course}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Entrega: {task.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {task.submissions}/{task.total} entregas
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* Progress */}
                  <div className="w-24 mr-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{Math.round((task.submissions / task.total) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(task.submissions / task.total) * 100}%` }}
                      />
                    </div>
                  </div>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
