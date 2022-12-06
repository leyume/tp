// const user: any = auth().currentUser;

export async function get(url: string, headers: object = {}) {
  try {
    // Get from API
    let action: any = {
      method: "GET",
    };

    let res = await fetch(process.env.NEXT_PUBLIC_API + "/" + url.replace(/^\/+/g, ""), action);
    // let res = await fetch("https://v5.db.transport.rest/" + url.replace(/^\/+/g, ""), action);
    let status = res.status;

    let ress = await res.json();
    // console.log("Result GET", { ...ress, status });

    if (!res.ok) throw { ...ress, status };
    return ress;
  } catch (error: any) {
    console.log("Error", error);
  }
}

export default { get };
