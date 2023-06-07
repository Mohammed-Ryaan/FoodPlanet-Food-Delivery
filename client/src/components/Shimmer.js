//Shimmer is done to make our UI look good and acts as placeholder till the time the api returns data and our page re renders

const Shimmer = () => {
  return (
    <>
      <div class=" bg-white rounded-lg overflow-hidden w-350 mt-20">
        <div class="p-4">
          <div class="animate-pulse">
            <div class="bg-gray-300 h-6 w-2/3 mb-2"></div>
            <div class="bg-gray-300 h-4 w-1/2"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start flex-wrap mt-10">
        {/* Create an array of 15 elements to act as shimmer */}
        {Array(15)
          .fill("")
          .map((e, index) => (
            <div class=" bg-white shadow-lg rounded-lg overflow-hidden w-350 m-10">
              <div class="animate-pulse">
                <div class="bg-gray-300 h-48 w-full"></div>
              </div>
              <div class="p-4">
                <div class="animate-pulse">
                  <div class="bg-gray-300 h-6 w-2/3 mb-2"></div>
                  <div class="bg-gray-300 h-4 w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Shimmer;
