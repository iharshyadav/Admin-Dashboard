import { Button } from '@/components/ui/button'
import connectToDb from '@/lib/model';
import Image from 'next/image'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <Button>send</Button>

    </main>
  )
}
