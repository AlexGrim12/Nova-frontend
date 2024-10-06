import { SocketProvider } from '@/app/components/provider/socket-provider'
import { ProjectionView } from '@/app/components/ProjectionView'

export default function ProjectionPage() {
  return (
    <SocketProvider>
      <ProjectionView />
    </SocketProvider>
  )
}
