import "./ManageAccount.css";

const ManageAccount = () => {
  return (
    <main className="manage-container">
      <header className="manage-acc">Manage My Account</header>
      <div className="manage-pro">My Profile</div>
      <div className="manage-add">Address Book</div>
      <div className="manage-pay">My Payment Options</div>
      <header className="manage-ord">My Orders</header>
      <div className="manage-rtns">My Returns</div>
      <div className="manage-can">My Cancellations</div>
      <header className="manage-wish">My Wishlist</header>
    </main>
  );
};

export default ManageAccount;
