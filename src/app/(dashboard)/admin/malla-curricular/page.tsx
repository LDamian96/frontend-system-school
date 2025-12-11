'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Clock,
  X,
  Save,
  CheckCircle2,
  Target,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Topic {
  id: number
  name: string
  description: string
  hours: number
  completed: boolean
}

interface Unit {
  id: number
  name: string
  description: string
  topics: Topic[]
  order: number
}

interface Curriculum {
  id: number
  subject: string
  grade: string
  year: string
  units: Unit[]
  totalHours: number
  completedHours: number
}

const curriculums: Curriculum[] = [
  {
    id: 1,
    subject: 'Matemáticas',
    grade: '5to Grado',
    year: '2024',
    totalHours: 180,
    completedHours: 120,
    units: [
      {
        id: 1,
        name: 'Unidad 1: Números y Operaciones',
        description: 'Operaciones básicas y propiedades numéricas',
        order: 1,
        topics: [
          { id: 1, name: 'Números naturales y enteros', description: 'Propiedades y operaciones', hours: 8, completed: true },
          { id: 2, name: 'Fracciones y decimales', description: 'Conversión y operaciones', hours: 10, completed: true },
          { id: 3, name: 'Potencias y raíces', description: 'Propiedades y cálculo', hours: 8, completed: true },
        ]
      },
      {
        id: 2,
        name: 'Unidad 2: Álgebra',
        description: 'Introducción al álgebra y ecuaciones',
        order: 2,
        topics: [
          { id: 4, name: 'Expresiones algebraicas', description: 'Términos y polinomios', hours: 10, completed: true },
          { id: 5, name: 'Ecuaciones lineales', description: 'Resolución de ecuaciones', hours: 12, completed: true },
          { id: 6, name: 'Sistemas de ecuaciones', description: 'Métodos de resolución', hours: 10, completed: false },
        ]
      },
      {
        id: 3,
        name: 'Unidad 3: Geometría',
        description: 'Figuras geométricas y medidas',
        order: 3,
        topics: [
          { id: 7, name: 'Polígonos', description: 'Clasificación y propiedades', hours: 8, completed: false },
          { id: 8, name: 'Áreas y perímetros', description: 'Cálculo de medidas', hours: 10, completed: false },
          { id: 9, name: 'Volúmenes', description: 'Cuerpos geométricos', hours: 8, completed: false },
        ]
      },
    ]
  },
  {
    id: 2,
    subject: 'Español',
    grade: '5to Grado',
    year: '2024',
    totalHours: 150,
    completedHours: 100,
    units: [
      {
        id: 1,
        name: 'Unidad 1: Comunicación',
        description: 'Habilidades comunicativas',
        order: 1,
        topics: [
          { id: 1, name: 'Comprensión lectora', description: 'Técnicas de lectura', hours: 12, completed: true },
          { id: 2, name: 'Expresión oral', description: 'Técnicas de exposición', hours: 10, completed: true },
        ]
      },
    ]
  },
]

export default function AdminMallaCurricularPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCurriculum, setExpandedCurriculum] = useState<number | null>(1)
  const [expandedUnits, setExpandedUnits] = useState<number[]>([1])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const toggleUnit = (unitId: number) => {
    setExpandedUnits(prev =>
      prev.includes(unitId)
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    )
  }

  const filteredCurriculums = curriculums.filter(c =>
    c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.grade.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Malla Curricular</h1>
          <p className="text-muted-foreground mt-1">Gestiona el plan de estudios por materia y grado</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Malla
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Mallas Activas', value: curriculums.length, icon: Layers, color: 'text-primary', bgColor: 'bg-primary/10' },
          { label: 'Unidades Totales', value: curriculums.reduce((acc, c) => acc + c.units.length, 0), icon: BookOpen, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
          { label: 'Temas Totales', value: curriculums.reduce((acc, c) => acc + c.units.reduce((a, u) => a + u.topics.length, 0), 0), icon: Target, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
          { label: 'Horas Planificadas', value: curriculums.reduce((acc, c) => acc + c.totalHours, 0), icon: Clock, color: 'text-green-500', bgColor: 'bg-green-500/10' },
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
                placeholder="Buscar por materia o grado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select className="h-10 px-3 rounded-md border border-input bg-background text-sm">
              <option value="">Todos los grados</option>
              <option value="3ro">3ro Grado</option>
              <option value="4to">4to Grado</option>
              <option value="5to">5to Grado</option>
              <option value="6to">6to Grado</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Curriculums */}
      <div className="space-y-4">
        {filteredCurriculums.map((curriculum, index) => (
          <motion.div
            key={curriculum.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card>
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedCurriculum(expandedCurriculum === curriculum.id ? null : curriculum.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Layers className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {curriculum.subject}
                        <span className="text-sm font-normal text-muted-foreground">
                          - {curriculum.grade} ({curriculum.year})
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {curriculum.units.length} unidades · {curriculum.totalHours} horas totales
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">
                        {Math.round((curriculum.completedHours / curriculum.totalHours) * 100)}% completado
                      </p>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(curriculum.completedHours / curriculum.totalHours) * 100}%` }}
                        />
                      </div>
                    </div>
                    {expandedCurriculum === curriculum.id ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {expandedCurriculum === curriculum.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {curriculum.units.map((unit, unitIndex) => (
                          <div key={unit.id} className="border rounded-xl overflow-hidden">
                            <div
                              className="p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => toggleUnit(unit.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {expandedUnits.includes(unit.id) ? (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <div>
                                    <p className="font-medium">{unit.name}</p>
                                    <p className="text-sm text-muted-foreground">{unit.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">
                                    {unit.topics.length} temas
                                  </span>
                                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <AnimatePresence>
                              {expandedUnits.includes(unit.id) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="border-t"
                                >
                                  <div className="p-4 space-y-2">
                                    {unit.topics.map((topic, topicIndex) => (
                                      <motion.div
                                        key={topic.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: topicIndex * 0.05 }}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          {topic.completed ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                          ) : (
                                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                                          )}
                                          <div>
                                            <p className={`font-medium ${topic.completed ? 'text-muted-foreground line-through' : ''}`}>
                                              {topic.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">{topic.description}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {topic.hours}h
                                          </span>
                                          <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </motion.div>
                                    ))}
                                    <Button variant="outline" size="sm" className="w-full mt-2">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Agregar Tema
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}

                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar Unidad
                        </Button>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar Malla
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Exportar PDF
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
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
                <h2 className="text-xl font-semibold">Nueva Malla Curricular</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Materia</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                    <option value="">Seleccionar materia...</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Español">Español</option>
                    <option value="Ciencias">Ciencias</option>
                    <option value="Historia">Historia</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Grado</label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                      <option value="">Seleccionar...</option>
                      <option value="3ro">3ro Grado</option>
                      <option value="4to">4to Grado</option>
                      <option value="5to">5to Grado</option>
                      <option value="6to">6to Grado</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Año</label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Horas Totales</label>
                  <Input type="number" placeholder="180" />
                </div>
              </div>
              <div className="p-6 border-t flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowCreateModal(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  Crear Malla
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
