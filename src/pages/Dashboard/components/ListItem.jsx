import { useSelector } from "react-redux";

function ListItem() {
  const { data } = useSelector((state) => state.crud);

  return (
    <div className="flex justify-center p-4">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Daftar Item
        </h2>

        {data.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Belum ada item ditambahkan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between space-y-3"
              >
                <div className="text-gray-800">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex justify-end space-x-2 mt-auto pt-3 border-t border-gray-200"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListItem;
