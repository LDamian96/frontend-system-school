'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Plus,
  Search,
  Users,
  UserCheck,
  X,
  Save,
  Layers,
  BookOpen,
  ChevronRight,
  Trash2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Section {
  id: string
  name: string
  studentsCount: number
  coursesCount: number
}

interface Grade {
  id: string
  name: string
  level: string
  sections: Section[]
  color: string
}

const grades: Grade[] = [
  {
    id: '1',
    name: '1er Grado',
    level: 'Primaria',
    color: 'bg-blue-500',
    sections: [
      { id: '1a', name: 'A', studentsCount: 28, coursesCount: 6 },
      { id: '1b', name: 'B', studentsCount: 30, coursesCount: 6 },
      { id: '1c', name: 'C', studentsCount: 27, coursesCount: 6 },
    ]
  },
  {
    id: '2',
    name: '2do Grado',
    level: 'Primaria',
    color: 'bg-green-500',
    sections: [
      { id: '2a', name: 'A', studentsCount: 32, coursesCount: 6 },
      { id: '2b', name: 'B', studentsCount: 29, coursesCount: 6 },
    ]
  },
  {
    id: '3',
    name: '3er Grado',
    level: 'Primaria',
    color: 'bg-purple-500',
    sections: [
      { id: '3a', name: 'A', studentsCount: 31, coursesCount: 7 },
      { id: '3b', name: 'B', studentsCount: 28, coursesCount: 7 },
      { id: '3c', name: 'C', studentsCount: 30, coursesCount: 7 },
    ]
  },
  {
    id: '4',
    name: '4to Grado',
    level: 'Primaria',
    color: 'bg-orange-500',
    sections: [
      { id: '4a', name: 'A', studentsCount: 30, coursesCount: 7 },
      { id: '4b', name: 'B', studentsCount: 31, coursesCount: 7 },
    ]
  },
  {
    id: '5',
    name: '5to Grado',
    level: 'Primaria',
    color: 'bg-pink-500',
    sections: [
      { id: '5a', name: 'A', studentsCount: 32, coursesCount: 8 },
      { id: '5b', name: 'B', studentsCount: 28, coursesCount: 8 },
      { id: '5c', name: 'C', studentsCount: 29, coursesCount: 8 },
    ]
  },
  {
    id: '6',
    name: '6to Grado',
    level: 'Primaria',
    color: 'bg-cyan-500',
    sections: [
      { id: '6a', name: 'A', studentsCount: 30, coursesCount: 8 },
      { id: '6b', name: 'B', studentsCount: 31, coursesCount: 8 },
    ]
  },
  {
    id: '7',
    name: '1er Año',
    level: 'Secundaria',
    color: 'bg-indigo-500',
    sections: [
      { id: '7a', name: 'A', studentsCount: 35, coursesCount: 10 },
      { id: '7b', name: 'B', studentsCount: 33, coursesCount: 10 },
    ]
  },
]

interface NewSection {
  name: string
}

interface NewGrade {
  name: string
  level: string
  sections: NewSection[]
}

const initialNewGrade: NewGrade = {
  name: '',
  level: 'Primaria',
  sections: [{ name: 'A' }]
}

export default function GradosSeccinesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newGrade, setNewGrade] = useState<NewGrade>(initialNewGrade)

  const levels = [...new Set(grades.map(g => g.level))]

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = searchTerm === '' ||
      grade.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === '' || grade.level === filterLevel
    return matchesSearch && matchesLevel
  })

  const totalStats = {
    grades: grades.length,
    sections: grades.reduce((acc, g) => acc + g.sections.length, 0),
    students: grades.reduce((acc, g) => acc + g.sections.reduce((a, s) => a + s.studentsCount, 0), 0),
  }

  const addSection = () => {
    const nextLetter = String.fromCharCode(65 + newGrade.sections.length) // A, B, C...
    setNewGrade({
      ...newGrade,
      sections: [...newGrade.sections, { name: nextLetter }]
    })
  }

  const removeSection = (index: number) => {
    if (newGrade.sections.length > 1) {
      setNewGrade({
        ...newGrade,
        sections: newGrade.sections.filter((_, i) => i !== index)
      })
    }
  }

  const updateSectionName = (index: number, name: string) => {
    const updatedSections = [...newGrade.sections]
    updatedSections[index] = { name }
    setNewGrade({ ...newGrade, sections: updatedSections })
  }

  const handleCreateGrade = () => {
    if (!newGrade.name || newGrade.sections.length === 0) return
    // Aquí iría la llamada a la API
    console.log('Creating grade:', newGrade)
    resetModal()
  }

  const resetModal = () => {
    setNewGrade(initialNewGrade)
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Grados y Secciones</h1>
          <p className="text-muted-foreground mt-1">Gestiona la estructura académica de la institución</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Grado
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Grados', value: totalStats.grades, icon: GraduationCap, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
          { label: 'Total Secciones', value: totalStats.sections, icon: Layers, color: 'text-green-500', bgColor: 'bg-green-500/10' },
          { label: 'Estudiantes', value: totalStats.students, icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
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

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar grado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">Todos los niveles</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Grades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrades.map((grade, index) => (
          <motion.div
            key={grade.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
              onClick={() => router.push(`/admin/grados-secciones/${grade.id}`)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl ${grade.color} flex items-center justify-center`}>
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="font-semibold text-xl mb-1">{grade.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{grade.level}</p>

                {/* Secciones */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Secciones</p>
                  <div className="flex flex-wrap gap-2">
                    {grade.sections.map(section => (
                      <div
                        key={section.id}
                        className={`px-3 py-1.5 rounded-lg ${grade.color}/20 text-sm font-medium`}
                      >
                        {section.name} <span className="text-muted-foreground">({section.studentsCount})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      <strong>{grade.sections.reduce((a, s) => a + s.studentsCount, 0)}</strong> Estudiantes
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span><strong>{grade.sections.length}</strong> Secciones</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create Grade Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={resetModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-lg shadow-xl w-full max-w-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Crear Nuevo Grado</h2>
                  <Button variant="ghost" size="icon" onClick={resetModal}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Define el grado, nivel y sus secciones
                </p>
              </div>

              <div className="p-6 space-y-5">
                {/* Nombre y Nivel en la misma fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre del Grado</label>
                    <Input
                      placeholder="Ej: 7mo Grado"
                      value={newGrade.name}
                      onChange={(e) => setNewGrade({ ...newGrade, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nivel</label>
                    <select
                      value={newGrade.level}
                      onChange={(e) => setNewGrade({ ...newGrade, level: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="Inicial">Inicial</option>
                      <option value="Primaria">Primaria</option>
                      <option value="Secundaria">Secundaria</option>
                    </select>
                  </div>
                </div>

                {/* Secciones */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium">Secciones</label>
                    <Button variant="outline" size="sm" onClick={addSection}>
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {newGrade.sections.map((section, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0`}>
                          <span className="font-semibold text-primary">{index + 1}</span>
                        </div>
                        <Input
                          placeholder="Nombre de sección (A, B, C...)"
                          value={section.name}
                          onChange={(e) => updateSectionName(index, e.target.value)}
                          className="flex-1"
                        />
                        {newGrade.sections.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSection(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    Se crearán {newGrade.sections.length} sección(es) para este grado
                  </p>
                </div>

                {/* Preview */}
                {newGrade.name && (
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm font-medium mb-2">Vista previa:</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{newGrade.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {newGrade.level} - Secciones: {newGrade.sections.map(s => s.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={resetModal}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateGrade}
                  disabled={!newGrade.name || newGrade.sections.length === 0}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Crear Grado
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
