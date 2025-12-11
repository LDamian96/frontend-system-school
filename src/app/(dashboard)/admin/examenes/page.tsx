'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PenTool,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  FileText,
  CheckCircle2,
  Edit,
  Trash2,
  Eye,
  Download,
  X,
  BarChart3,
  BookOpen
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Exam {
  id: number
  title: string
  subject: string
  course: string
  teacher: string
  date: string
  duration: string
  totalPoints: number
  status: 'scheduled' | 'in_progress' | 'grading' | 'completed'
  studentsTotal: number
  studentsGraded: number
  averageGrade: number | null
}

const exams: Exam[] = [
  { id: 1, title: 'Examen Parcial - Álgebra', subject: 'Matemáticas', course: '5to A', teacher: 'Prof. López', date: '2024-12-15', duration: '90 min', totalPoints: 20, status: 'scheduled', studentsTotal: 28, studentsGraded: 0, averageGrade: null },
  { id: 2, title: 'Examen Final - Geometría', subject: 'Matemáticas', course: '5to B', teacher: 'Prof. García', date: '2024-12-20', duration: '120 min', totalPoints: 20, status: 'scheduled', studentsTotal: 30, studentsGraded: 0, averageGrade: null },
  { id: 3, title: 'Evaluación Continua', subject: 'Español', course: '4to A', teacher: 'Prof. Martínez', date: '2024-12-10', duration: '45 min', totalPoints: 20, status: 'grading', studentsTotal: 26, studentsGraded: 18, averageGrade: null },
  { id: 4, title: 'Examen de Recuperación', subject: 'Ciencias', course: '3ro B', teacher: 'Prof. Rodríguez', date: '2024-12-08', duration: '60 min', totalPoints: 20, status: 'completed', studentsTotal: 25, studentsGraded: 25, averageGrade: 15.8 },
  { id: 5, title: 'Examen Final', subject: 'Historia', course: '6to A', teacher: 'Prof. Sánchez', date: '2024-12-06', duration: '90 min', totalPoints: 20, status: 'completed', studentsTotal: 32, studentsGraded: 32, averageGrade: 16.2 },
  { id: 6, title: 'Evaluación Oral', subject: 'Inglés', course: '4to B', teacher: 'Prof. Williams', date: '2024-12-05', duration: '30 min', totalPoints: 20, status: 'completed', studentsTotal: 28, studentsGraded: 28, averageGrade: 17.5 },
]

export default function AdminExamenesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)

  // Obtener materias y cursos únicos para los filtros
  const subjects = [...new Set(exams.map(e => e.subject))]
  const courses = [...new Set(exams.map(e => e.course))]

  const getStatusBadge = (status: Exam['status']) => {
    const styles = {
      scheduled: 'bg-blue-500/20 text-blue-600',
      in_progress: 'bg-yellow-500/20 text-yellow-600',
      grading: 'bg-orange-500/20 text-orange-600',
      completed: 'bg-green-500/20 text-green-600'
    }
    const labels = {
      scheduled: 'Programado',
      in_progress: 'En Curso',
      grading: 'Calificando',
      completed: 'Completado'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const filteredExams = exams.filter(exam => {
    const matchesSearch = searchTerm === '' ||
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.teacher.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSubject = filterSubject === '' || exam.subject === filterSubject
    const matchesCourse = filterCourse === '' || exam.course === filterCourse
    const matchesStatus = filterStatus === '' || exam.status === filterStatus

    return matchesSearch && matchesSubject && matchesCourse && matchesStatus
  })

  const stats = {
    total: exams.length,
    scheduled: exams.filter(e => e.status === 'scheduled').length,
    grading: exams.filter(e => e.status === 'grading').length,
    completed: exams.filter(e => e.status === 'completed').length,
    avgGrade: exams.filter(e => e.averageGrade).reduce((acc, e) => acc + (e.averageGrade || 0), 0) / exams.filter(e => e.averageGrade).length || 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Gestión de Exámenes</h1>
          <p className="text-muted-foreground mt-1">Administra todos los exámenes del colegio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Crear Examen
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Total Exámenes', value: stats.total, icon: PenTool, color: 'text-primary', bgColor: 'bg-primary/10' },
          { label: 'Programados', value: stats.scheduled, icon: Calendar, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
          { label: 'Por Calificar', value: stats.grading, icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
          { label: 'Completados', value: stats.completed, icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
          { label: 'Promedio Gral.', value: stats.avgGrade.toFixed(1), icon: BarChart3, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
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

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, materia, curso o profesor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                <option value="">Todas las materias</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <select
                className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="">Todos los grados</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              <select
                className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="scheduled">Programado</option>
                <option value="in_progress">En Curso</option>
                <option value="grading">Por calificar</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Exámenes</CardTitle>
          <CardDescription>Todos los exámenes registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Examen</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Curso</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Profesor</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Progreso</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Promedio</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam, index) => (
                  <motion.tr
                    key={exam.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{exam.title}</p>
                          <p className="text-sm text-muted-foreground">{exam.subject}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">{exam.course}</td>
                    <td className="py-4 px-4">{exam.teacher}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {exam.date}
                      </div>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(exam.status)}</td>
                    <td className="py-4 px-4">
                      <div className="w-24">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{exam.studentsGraded}/{exam.studentsTotal}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(exam.studentsGraded / exam.studentsTotal) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {exam.averageGrade !== null ? (
                        <span className={`font-bold ${
                          exam.averageGrade >= 16 ? 'text-green-500' :
                          exam.averageGrade >= 14 ? 'text-blue-500' :
                          exam.averageGrade >= 11 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {exam.averageGrade.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedExam(exam)
                            setShowDetailModal(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedExam.title}</h2>
                  <p className="text-sm text-muted-foreground">{selectedExam.subject} - {selectedExam.course}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowDetailModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Profesor</p>
                    <p className="font-medium">{selectedExam.teacher}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                    <p className="font-medium">{selectedExam.date}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Duración</p>
                    <p className="font-medium">{selectedExam.duration}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Puntaje Total</p>
                    <p className="font-medium">{selectedExam.totalPoints} puntos</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Progreso de Calificación</h3>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="flex justify-between mb-2">
                      <span>Estudiantes calificados</span>
                      <span className="font-medium">{selectedExam.studentsGraded} / {selectedExam.studentsTotal}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(selectedExam.studentsGraded / selectedExam.studentsTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {selectedExam.averageGrade !== null && (
                  <div>
                    <h3 className="font-medium mb-3">Estadísticas</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-green-500/10 text-center">
                        <p className="text-2xl font-bold text-green-500">{selectedExam.averageGrade.toFixed(1)}</p>
                        <p className="text-sm text-muted-foreground">Promedio</p>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-500/10 text-center">
                        <p className="text-2xl font-bold text-blue-500">18</p>
                        <p className="text-sm text-muted-foreground">Nota más alta</p>
                      </div>
                      <div className="p-4 rounded-xl bg-red-500/10 text-center">
                        <p className="text-2xl font-bold text-red-500">11</p>
                        <p className="text-sm text-muted-foreground">Nota más baja</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                  Cerrar
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Reporte
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
