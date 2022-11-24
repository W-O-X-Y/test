export function toSaudiRiyal(value: number = 0): string {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'SAR',
    }).format(value)
}
