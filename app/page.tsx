import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="max-w-7x1 flex-col gap-10 mx-auto p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4x1 font-bold">TÂCHES</h1>
        <Button>Ajouter des taches</Button>
      </div>
    </div>
  );
}
