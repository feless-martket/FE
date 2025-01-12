"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PointsSectionProps {
  availablePoints: number;
  onPointsChange: (points: number) => void;
}

export function PointsSection({
  availablePoints,
  onPointsChange,
}: PointsSectionProps) {
  const [usedPoints, setUsedPoints] = useState(0);

  const handlePointsChange = (value: number) => {
    const points = Math.min(Math.max(value, 0), availablePoints);
    setUsedPoints(points);
    onPointsChange(points);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">적립금</h3>
      <div className="flex gap-2">
        <Input
          type="number"
          value={usedPoints}
          onChange={(e) => handlePointsChange(Number(e.target.value))}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={() => handlePointsChange(availablePoints)}
        >
          모두사용
        </Button>
      </div>
      <p className="text-muted-foreground text-xs">
        사용 가능 적립금 {availablePoints.toLocaleString()}원
      </p>
    </div>
  );
}
