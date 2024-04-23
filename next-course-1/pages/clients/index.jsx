import Link from "next/link";

function ClientsPage() {
  const clients = [
    { id: "adam", name: "Adam" },
    { id: "szabo", name: "Adam Szabo" },
  ];
  return (
    <div>
      Clients Page
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
