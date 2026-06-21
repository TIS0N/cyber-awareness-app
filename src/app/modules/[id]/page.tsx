import ModuleDetailClient from "../../../components/modules/ModuleDetailClient";

interface ModulePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params;

  return <ModuleDetailClient moduleId={id} />;
}
