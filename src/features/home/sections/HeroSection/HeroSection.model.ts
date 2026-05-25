export type CardSize = {
  label: string
  isDefault?: true
  /** Подпись под объёмом — срок архива */
  archiveDays: string
  /** Короткий статус: мало / норма / рекомендуемо */
  status: string
  /** Сколько из 6 полос заполнено */
  filledBars: number
  /** Класс скорости microSD */
  speedClass?: string
}
