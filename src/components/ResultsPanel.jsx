import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { CheckCircle2, Circle, Table, Lightbulb, Binary } from "lucide-react";
import LogicDiagram from "./LogicDiagram";


export default function ResultsPanel({ results, varNames, numVars }) {
  return (
    <div className="space-y-6">

      {/* Expression Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SOP */}
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-lg p-6 border-2 border-emerald-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Sum of Products (SOP)</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-emerald-200">
              <p className="text-xs font-semibold text-slate-600 mb-1">Canonical Form:</p>
              <p className="text-lg font-bold font-mono" data-testid="canonical-sop">
                F = {results.canonical_sop}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200">
              <p className="text-xs font-semibold text-slate-600 mb-1">Minimal Form:</p>
              <p className="text-xl font-bold text-emerald-700 font-mono" data-testid="minimal-sop">
                F = {results.minimal_sop}
              </p>
            </div>
          </div>
        </Card>

        {/* POS */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border-2 border-blue-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Product of Sums (POS)</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-slate-600 mb-1">Canonical Form:</p>
              <p className="text-lg font-bold font-mono" data-testid="canonical-pos">
                F = {results.canonical_pos}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-slate-600 mb-1">Minimal Form:</p>
              <p className="text-xl font-bold text-blue-700 font-mono" data-testid="minimal-pos">
                F = {results.minimal_pos}
              </p>
            </div>
          </div>
        </Card>

      </div>

      {/* Tabs */}
      <Tabs defaultValue="truth-table" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 p-1 rounded-xl shadow-sm">

          <TabsTrigger
            value="truth-table"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg"
          >
            <Table className="w-4 h-4 mr-2" />
            Truth Table
          </TabsTrigger>

          <TabsTrigger
            value="prime-implicants"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg"
          >
            <Binary className="w-4 h-4 mr-2" />
            Prime Implicants
          </TabsTrigger>

          <TabsTrigger
            value="steps"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Steps
          </TabsTrigger>

          <TabsTrigger
            value="logic-diagram"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Logic Diagram
          </TabsTrigger>

        </TabsList>

        {/* Truth Table */}
        <TabsContent value="truth-table">
          <Card className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Truth Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                    {varNames.slice(0, numVars).map((name) => (
                      <th key={name} className="px-4 py-2 text-left font-semibold">{name}</th>
                    ))}
                    <th className="px-4 py-2 text-left font-semibold">F</th>
                    <th className="px-4 py-2 text-left font-semibold">Minterm</th>
                  </tr>
                </thead>
                <tbody>
                  {results.truth_table.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      {varNames.slice(0, numVars).map((name) => (
                        <td key={name} className="px-4 py-2 font-mono">{row[name]}</td>
                      ))}
                      <td className="px-4 py-2 font-bold font-mono">
                        {row.F}
                      </td>
                      <td className="px-4 py-2 font-mono">{row.minterm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Prime Implicants */}
        <TabsContent value="prime-implicants">
          <Card className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Prime Implicants</h3>
            <div className="space-y-3">
              {results.prime_implicants.map((pi, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {pi.essential ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                    <div>
                      <p className="font-mono font-semibold">{pi.term}</p>
                      <p className="text-sm text-slate-600">
                        Expression: <span className="font-semibold">{pi.expression}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{pi.essential ? "Essential" : "Non-Essential"}</Badge>
                    <Badge variant="outline">Minterms: {pi.minterms.join(", ")}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Steps */}
        <TabsContent value="steps">
          <Card className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Minimization Steps</h3>
            <ol className="space-y-3">
              {results.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </Card>
        </TabsContent>

        <TabsContent value="logic-diagram">
          <Card className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
               Logic Diagram (from Minimal SOP)
            </h3>

            {/* Remove "F =" before passing */}
            <LogicDiagram
              sop={results.minimal_sop.replace(/^F\s*=\s*/i, "")}
            />
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}
