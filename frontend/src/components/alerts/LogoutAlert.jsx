// import React from 'react'

const LogoutAlert = ({ content, onLogout }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutAlert;
