import React from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Calculator, Loader2 } from "lucide-react";

export default function InputPanel({
  numVars,
  setNumVars,
  inputMode,
  setInputMode,
  minterms,
  setMinterms,
  maxterms,
  setMaxterms,
  dontCares,
  setDontCares,
  expression,
  setExpression,
  varNames,
  setVarNames,
  onMinimize,
  loading,
}) {
  const parseNumbers = (value, maxValue) => {
    const nums = value
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .map((n) => parseInt(n, 10))
      .filter((n) => !isNaN(n) && n >= 0 && n < maxValue);
    return [...new Set(nums)];
  };

  const handleMintermChange = (e) => {
    const nums = parseNumbers(e.target.value, 2 ** numVars);
    setMinterms(nums);
  };

  const handleMaxtermChange = (e) => {
    const nums = parseNumbers(e.target.value, 2 ** numVars);
    setMaxterms(nums);
  };

  const handleDontCareChange = (e) => {
    const nums = parseNumbers(e.target.value, 2 ** numVars);
    setDontCares(nums);
  };

  const hasValidInput = () => {
    if (inputMode === "minterm") return minterms.length > 0;
    if (inputMode === "maxterm") return maxterms.length > 0;
    return false;
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg p-6 sm:p-8 card-hover">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Configure K-Map Parameters
      </h2>

      {/* Input Mode */}
      <div className="space-y-4 mb-6">
        <Label className="text-base font-semibold text-slate-700">
          Input Mode
        </Label>
        <RadioGroup
          value={inputMode}
          onValueChange={(val) => {
            setInputMode(val);
            setMinterms([]);
            setMaxterms([]);
            setDontCares([]);
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minterm" id="mode-minterm" />
            <Label htmlFor="mode-minterm">Minterm (Sum of Products)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maxterm" id="mode-maxterm" />
            <Label htmlFor="mode-maxterm">Maxterm (Product of Sums)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Number of Variables */}
      <div className="space-y-4 mb-6">
        <Label className="text-base font-semibold text-slate-700">
          Number of Variables
        </Label>
        <RadioGroup
          value={numVars.toString()}
          onValueChange={(val) => {
            setNumVars(parseInt(val));
            setMinterms([]);
            setMaxterms([]);
            setDontCares([]);
          }}
          className="flex flex-col gap-3"
        >
          {[2, 3, 4].map((n) => (
            <div key={n} className="flex items-center space-x-2">
              <RadioGroupItem value={n.toString()} id={`var-${n}`} />
              <Label htmlFor={`var-${n}`}>{n} Variables</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Variable Names */}
      <div className="space-y-3 mb-6">
        <Label className="text-base font-semibold text-slate-700">
          Variable Names
        </Label>
        <div className="flex gap-3">
          {varNames.slice(0, numVars).map((name, idx) => (
            <Input
              key={idx}
              type="text"
              value={name}
              onChange={(e) => {
                const updated = [...varNames];
                updated[idx] = e.target.value;
                setVarNames(updated);
              }}
              className="input-field border-emerald-300 focus:border-emerald-500 w-24"
            />
          ))}
        </div>
      </div>

      {/* Minterms */}
      {inputMode === "minterm" && (
        <div className="space-y-3 mb-6">
          <Label>Minterms (comma-separated)</Label>
          <Input
            type="text"
            placeholder="e.g., 0, 2, 5, 7"
            defaultValue={minterms.join(", ")}
            onChange={handleMintermChange}
            className="input-field border-emerald-300 focus:border-emerald-500"
          />
        </div>
      )}

      {/* Maxterms */}
      {inputMode === "maxterm" && (
        <div className="space-y-3 mb-6">
          <Label>Maxterms (comma-separated)</Label>
          <Input
            type="text"
            placeholder="e.g., 1, 3, 4, 6"
            defaultValue={maxterms.join(", ")}
            onChange={handleMaxtermChange}
            className="input-field border-emerald-300 focus:border-emerald-500"
          />
        </div>
      )}

      {/* Don't Cares */}
      {(inputMode === "minterm" || inputMode === "maxterm") && (
        <div className="space-y-3 mb-6">
          <Label>Don't Cares (optional)</Label>
          <Input
            type="text"
            placeholder="e.g., 1, 4"
            defaultValue={dontCares.join(", ")}
            onChange={handleDontCareChange}
            className="input-field border-emerald-300 focus:border-emerald-500"
          />
        </div>
      )}

      {/* Minimize Button */}
      <Button
        onClick={onMinimize}
        disabled={loading || !hasValidInput()}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-6 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Minimizing...
          </>
        ) : (
          <>
            <Calculator className="w-5 h-5 mr-2" /> Minimize K-Map
          </>
        )}
      </Button>
    </Card>
  );
}
