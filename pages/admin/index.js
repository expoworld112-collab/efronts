import AdminDashLayout from "../../components/AdminDashLayout";

const AdminIndex = () => {

  return (

    <AdminDashLayout>
      <h2 style={{ color: "var(--text-color)", paddingTop: "7px" }}>Welcome To Admin's DashBoard</h2>
      <div style={{ color: "var(--text-color)", paddingTop: "10px" }}>You can now create posts, categories, tags, update or delete anyone's posts in this section</div>
    </AdminDashLayout>

  );
};

export default AdminIndex;
