const GET = async () => {
  return Response.json({ message: "Hello from the API!" }, { status: 200 });
};

const POST = async () => {
  return Response.json({ message: "Hello from the API!" });
};

export { GET, POST };
