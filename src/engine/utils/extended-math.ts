export class ExtendedMath{
    static clampValue(minValue: number, value: number, maxValue: number): number{
        return Math.min(maxValue, Math.max(value, minValue))
    }
}