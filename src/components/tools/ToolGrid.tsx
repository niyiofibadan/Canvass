import { TOOLS_BY_ID } from '../../data/tools'
import { ToolIcon } from './ToolIcon'

interface Props {
  toolIds: string[]
  onRemove?: (toolId: string) => void
}

export function ToolGrid({ toolIds, onRemove }: Props) {
  return (
    <>
      {toolIds.map((id) => {
        const tool = TOOLS_BY_ID[id]
        return tool ? (
          <ToolIcon key={id} tool={tool} onRemove={onRemove ? () => onRemove(id) : undefined} />
        ) : null
      })}
    </>
  )
}
