import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();
  console.log(router.query);

  function loadProjectHandler() {
    router.push({
      pathname:'/clients/[id]/[clientprojectid]',
      query:{id: 'adam' , clientprojectid:'projecta'},
    });
  }
  return (
    <div>
      <h1>The Projects of Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
