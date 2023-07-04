const DetailsModal = () => {
  return (
    <div className="flex flex-wrap -mx-3 mb-3 mt-5">
      <div className="w-full px-3">
        <label className="font-medium text-lg">Observación</label>
        <textarea
          id="observation"
          className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          name="description"
          cols="20"
          rows="3"
        />
      </div>
    </div>
  );
};

export default DetailsModal;
