'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardCheck,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Search,
  Save
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const students = [
  { id: 1, name: 'María García', avatar: 'MG', attendance: 'present' },
  { id: 2, name: 'Carlos Ruiz', avatar: 'CR', attendance: 'present' },
  { id: 3, name: 'Laura Méndez', avatar: 'LM', attendance: 'absent' },
  { id: 4, name: 'Diego Torres', avatar: 'DT', attendance: 'present' },
  { id: 5, name: 'Sofía López', avatar: 'SL', attendance: 'late' },
  { id: 6, name: 'Andrés Flores', avatar: 'AF', attendance: 'present' },
  { id: 7, name: 'Valentina Díaz', avatar: 'VD', attendance: 'present' },
  { id: 8, name: 'Mateo Sánchez', avatar: 'MS', attendance: 'absent' },
  { id: 9, name: 'Isabella Martínez', avatar: 'IM', attendance: 'present' },
  { id: 10, name: 'Samuel Rodríguez', avatar: 'SR', attendance: 'present' },
]

const courses = ['5to A - Matemáticas', '5to B - Matemáticas', '6to A - Álgebra', '6to B - Geometría']

export default function TeacherAsistenciaPage() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0])
  const [attendanceList, setAttendanceList] = useState(students)
  const [searchTerm, setSearchTerm] = useState('')

  const updateAttendance = (id: number, status: string) => {
    setAttendanceList(prev =>
      prev.map(s => s.id === id ? { ...s, attendance: status } : s)
    )
  }

  const stats = {
    present: attendanceList.filter(s => s.attendance === 'present').length,
    absent: attendanceList.filter(s => s.attendance === 'absent').length,
    late: attendanceList.filter(s => s.attendance === 'late').length,
  }

  const filteredStudents = attendanceList.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Control de Asistencia</h1>
          <p className="text-muted-foreground mt-1">Martes, 10 de Diciembre 2024</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Guardar Asistencia
        </Button>
      </div>

      {/* Course Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <Button
                key={course}
                variant={selectedCourse === course ? 'default' : 'outline'}
                onClick={() => setSelectedCourse(course)}
              >
                {course}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: attendanceList.length, icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
          { label: 'Presentes', value: stats.present, icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
          { label: 'Ausentes', value: stats.absent, icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-500/10' },
          { label: 'Tardanzas', value: stats.late, icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
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

      {/* Attendance List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Lista de Estudiantes</CardTitle>
              <CardDescription>{selectedCourse}</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar estudiante..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{student.name}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={student.attendance === 'present' ? 'default' : 'outline'}
                    className={student.attendance === 'present' ? 'bg-green-500 hover:bg-green-600' : ''}
                    onClick={() => updateAttendance(student.id, 'present')}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Presente
                  </Button>
                  <Button
                    size="sm"
                    variant={student.attendance === 'late' ? 'default' : 'outline'}
                    className={student.attendance === 'late' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                    onClick={() => updateAttendance(student.id, 'late')}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Tarde
                  </Button>
                  <Button
                    size="sm"
                    variant={student.attendance === 'absent' ? 'default' : 'outline'}
                    className={student.attendance === 'absent' ? 'bg-red-500 hover:bg-red-600' : ''}
                    onClick={() => updateAttendance(student.id, 'absent')}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Ausente
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
