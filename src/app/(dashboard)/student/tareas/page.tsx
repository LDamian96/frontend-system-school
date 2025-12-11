'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Upload,
  Eye,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const tasks = [
  {
    id: 1,
    title: 'Ejercicios de Álgebra Cap. 5',
    subject: 'Matemáticas',
    teacher: 'Prof. García',
    dueDate: '2024-12-15',
    status: 'in_progress',
    progress: 60,
    description: 'Resolver los ejercicios del 1 al 20 del capítulo 5'
  },
  {
    id: 2,
    title: 'Ensayo sobre la Revolución',
    subject: 'Historia',
    teacher: 'Prof. Rodríguez',
    dueDate: '2024-12-14',
    status: 'pending',
    progress: 30,
    description: 'Ensayo de 3 páginas sobre la Revolución Industrial'
  },
  {
    id: 3,
    title: 'Reporte de Laboratorio',
    subject: 'Ciencias',
    teacher: 'Prof. Martínez',
    dueDate: '2024-12-13',
    status: 'pending',
    progress: 0,
    description: 'Documentar los resultados del experimento de química'
  },
  {
    id: 4,
    title: 'Lectura Comprensiva',
    subject: 'Español',
    teacher: 'Prof. López',
    dueDate: '2024-12-10',
    status: 'submitted',
    progress: 100,
    description: 'Leer el capítulo 8 y responder las preguntas'
  },
  {
    id: 5,
    title: 'Proyecto de Inglés',
    subject: 'Inglés',
    teacher: 'Prof. Smith',
    dueDate: '2024-12-08',
    status: 'graded',
    progress: 100,
    grade: 95,
    description: 'Presentación oral sobre cultura americana'
  },
]

const stats = [
  { label: 'Pendientes', value: '3', icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  { label: 'En Progreso', value: '1', icon: FileText, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { label: 'Entregadas', value: '5', icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
]

export default function StudentTareasPage() {
  const [filter, setFilter] = useState('all')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status === filter
  })

  const getStatusBadge = (status: string, grade?: number) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-600">Pendiente</span>
      case 'in_progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-600">En Progreso</span>
      case 'submitted':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-600">Entregada</span>
      case 'graded':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-600">Calificada: {grade}%</span>
      default:
        return null
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !['submitted', 'graded'].includes(tasks.find(t => t.dueDate === dueDate)?.status || '')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Mis Tareas</h1>
          <p className="text-muted-foreground mt-1">Gestiona tus tareas y entregas</p>
        </div>
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
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'all', label: 'Todas' },
          { value: 'pending', label: 'Pendientes' },
          { value: 'in_progress', label: 'En Progreso' },
          { value: 'submitted', label: 'Entregadas' },
          { value: 'graded', label: 'Calificadas' },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      {getStatusBadge(task.status, task.grade)}
                      {isOverdue(task.dueDate) && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Vencida
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{task.subject}</span>
                      <span>{task.teacher}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Entrega: {task.dueDate}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {task.status !== 'graded' && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {task.status === 'pending' || task.status === 'in_progress' ? (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-1" />
                          Entregar
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
