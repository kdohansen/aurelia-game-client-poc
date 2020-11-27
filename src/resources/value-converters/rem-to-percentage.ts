export class RemToPercentageValueConverter{
    toView(value: number): string{
        return Math.round(value * 100) + "%";
    }
}