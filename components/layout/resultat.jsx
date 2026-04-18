export default function Resultats({ resultats = [] }) {

    // Total des votes
    const totalVotes = resultats.reduce((acc, r) => acc + Number(r.total), 0);

    return (
        <div className="flex flex-col gap-4">
            {resultats.map((r, index) => {

                const votes = Number(r.total);
                const percent = totalVotes > 0 
                    ? ((votes / totalVotes) * 100).toFixed(1) 
                    : 0;

                const imageUrl = r.photo
                    ? `${process.env.NEXT_PUBLIC_URL_API}/Candidats/${r.photo}`
                    : "https://via.placeholder.com/150";

                return (
                    <div key={r.idcandid}
                        className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">

                        {/* Image + position */}
                        <div className="relative">
                            <div
                                className="w-20 h-20 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            />

                            <div className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-slate-500 text-white rounded-full text-xs font-bold border-2 border-white">
                                {index + 1}
                            </div>
                        </div>

                        {/* Infos */}
                        <div className="flex-1 w-full text-center md:text-left">

                            <h4 className="text-lg font-bold text-slate-900">
                                {r.lib}
                            </h4>

                            <p className="text-slate-500 text-sm">
                                {r.desc || " "}
                            </p>

                            {/* Progress */}
                            <div className="mt-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-slate-700">
                                        {votes} votes
                                    </span>
                                    <span className="font-bold text-slate-900">
                                        {percent}%
                                    </span>
                                </div>

                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}